import fs from 'fs';

async function main() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const page = targets.find(t => t.type === 'page' && t.url.includes('5174'));
  if (!page) {
    console.error('Page target not found');
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = idCounter++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await new Promise(resolve => ws.onopen = resolve);

  const capture = async (filename) => {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    if (res.result && res.result.data) {
      fs.writeFileSync(filename, Buffer.from(res.result.data, 'base64'));
      console.log('Saved:', filename);
    }
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Enable Page & Input
  await send('Page.enable');
  await send('DOM.enable');

  console.log('Reloading page to pick up latest build...');
  await send('Page.reload');
  await sleep(1200);

  console.log('1. Testing eye tracking: Looking far left...');
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 80, y: 350 });
  await sleep(400);
  await capture('scratch/test_look_left.png');

  console.log('2. Testing eye tracking: Looking far right...');
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1360, y: 350 });
  await sleep(400);
  await capture('scratch/test_look_right.png');

  console.log('3. Testing full-face grin: Clicking character...');
  // Click character at center (720, 260)
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 720, y: 260 });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 720, y: 260, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 720, y: 260, button: 'left', clickCount: 1 });
  await sleep(450);
  await capture('scratch/test_full_grin.png');

  console.log('4. Waiting for grin to return to normal...');
  await sleep(1800);

  console.log('5. Testing scroll transition: scrolling down 650px...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 650, behavior: "smooth" })' });
  await sleep(800);
  await capture('scratch/test_scrolled_docked.png');

  console.log('6. Clicking character while docked at top right...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.character-companion-mode');
      if (el) el.click();
    })()`
  });
  await sleep(450);
  await capture('scratch/test_docked_grin.png');

  console.log('7. Scrolling back to Hero (top = 0)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "smooth" })' });
  await sleep(800);
  await capture('scratch/test_scrolled_back_hero.png');

  console.log('All tests completed successfully!');
  ws.close();
}

main().catch(console.error);

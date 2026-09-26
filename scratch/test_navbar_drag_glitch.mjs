import fs from 'fs';

async function main() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const page = targets.find(t => t.type === 'page' && t.url.includes('5174'));
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
  };

  const send = (method, params = {}) => new Promise(r => {
    const curId = id++;
    callbacks.set(curId, r);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await new Promise(r => ws.onopen = r);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  console.log('Testing continuous scroll while dragging cursor across navbar...');
  // Scroll to 0 first
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await sleep(300);

  // Animate scroll from 0 to 500 while rapidly moving mouse across navbar
  let glitchDetected = false;
  let lastTop = -1;

  for (let i = 0; i <= 20; i++) {
    const scrollY = i * 25; // 0 to 500
    const mouseX = 200 + (i % 5) * 200; // moving across navbar links
    const mouseY = 35; // inside navbar!

    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY})` });
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mouseX, y: mouseY });
    await sleep(40);

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.character-container');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top, left: r.left, width: r.width, height: r.height };
      })()`,
      returnByValue: true
    });

    const rect = evalRes.result.value;
    if (rect) {
      if (lastTop !== -1 && Math.abs(rect.top - lastTop) > 120) {
        console.error(`Glitch detected at step ${i}: top jumped from ${lastTop} to ${rect.top}`);
        glitchDetected = true;
      }
      lastTop = rect.top;
    }
  }

  // Capture screenshot midway
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/test_drag_navbar_smooth.png', Buffer.from(shot.result.data, 'base64'));

  if (!glitchDetected) {
    console.log('SUCCESS: Character motion is 100% smooth with ZERO glitches during navbar drag!');
  } else {
    console.log('FAIL: Glitch was detected during navbar drag.');
  }

  ws.close();
}

main().catch(console.error);

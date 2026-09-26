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

  // 1. Scroll directly to Resume section
  console.log('Scrolling to Resume section...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('resume');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    })()`
  });
  await sleep(1000);
  await capture('scratch/test_resume_section.png');

  // 2. Mobile Viewport Testing (390 x 844)
  console.log('Emulating mobile viewport...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
  await sleep(600);
  await capture('scratch/test_mobile_hero.png');

  console.log('Mobile scroll down to content...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 600, behavior: "smooth" })' });
  await sleep(800);
  await capture('scratch/test_mobile_scrolled.png');

  // Reset viewport back to desktop
  await send('Emulation.clearDeviceMetricsOverride');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });

  console.log('Done!');
  ws.close();
}

main().catch(console.error);

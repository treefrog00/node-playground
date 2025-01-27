import { app, BrowserWindow }  from 'electron';
import * as path  from 'path';
import { spawn } from 'child_process';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(import.meta.dirname, 'preload.js')
      }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });

  let sidecarBinary = '/home/james/.config/Aide/User/globalStorage/codestory-ghost.codestoryai/sidecar_bin/target/release/webserver'
  const child = spawn('python', ['-c', 'import time; time.sleep(50000)']);
  //const child = spawn(sidecarBinary);
  child.unref();
  console.log("hello")
})

app.on('window-all-closed', () => {
    console.log("quitting")
    if (process.platform !== 'darwin') app.quit()
})
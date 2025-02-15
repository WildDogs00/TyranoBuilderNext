const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const ProgressBar = require('electron-progressbar');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    frame: true,
    width: 1280,
    height: 720,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    resizable: true,
  });

  mainWindow.setAutoHideMenuBar(true);

  mainWindow.loadFile(path.join(__dirname, 'tyrano.html'))
      .then(() => {
        console.log('Файл успешно загружен');
      })
      .catch((error) => {
        console.error('Ошибка при загрузке файла:', error);
      });

  const shortcut = process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I';
  globalShortcut.register(shortcut, () => {
    mainWindow.webContents.toggleDevTools();
  });

  mainWindow.on('close', async function (event) {
    event.preventDefault();
    globalShortcut.unregisterAll();
    await mainWindow.webContents.session.clearCache();
    mainWindow.destroy();
  });
}


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});




ipcMain.on('resizeWindow1280', async () => {
  mainWindow.setSize(1286, 739)
})
ipcMain.on('resizeWindow1700', async () => {
  mainWindow.setSize(1716, 900)
})

let updateNeeded = false;
let archivePath = '';
let updateInfoGlobal;

ipcMain.on('update-confirmed', (event, arg) => {
  updateNeeded = true;
  archivePath = arg.archivePath;
  updateInfoGlobal = arg.updateInfo;
  mainWindow.close();
});

app.on('before-quit', async (event) => {
  if (updateNeeded) {
    event.preventDefault();
    const AdmZip = require('adm-zip');
    const fs = require('fs');
    const progressBar = new ProgressBar({
      title: 'Update',
      text: 'Installing the update...',
      detail: 'Please wait',
      browserWindow: {
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
        parent: mainWindow,
        modal: true,
        resizable: false,
        closable: false,
        minimizable: false,
        maximizable: false,
        fullscreen: false,
        width: 400,
        height: 180,
      }
    });

    const zip = new AdmZip(archivePath);
    try {
      progressBar.detail = 'Unzipping the archive...';
      zip.extractAllTo('./', /*overwrite*/true);
      progressBar.detail = 'Version update...';
      fs.writeFileSync('./version.json', JSON.stringify({ version: updateInfoGlobal.version }, null, 2));
      progressBar.detail = 'Deleting the archive...';
      fs.unlinkSync(archivePath);
      progressBar.detail = 'The update is now complete!';
      setTimeout(() => progressBar.setCompleted(), 3000);
      app.quit();
    } catch (error) {
      fs.writeFileSync('update_error.log', error.toString());
      progressBar.detail = 'Update error!';
      setTimeout(() => progressBar.close(), 1000);
    }
  }
});
app.whenReady().then(() => {
  checkAndUpdateApp();
  setInterval(checkAndUpdateApp, 30 * 60 * 1000);
});

var log = require('electron-log');

process.on('uncaughtException', function (err) {
  log.error('electron:event:uncaughtException');
  log.error(err);
  log.error(err.stack);
  electron_app.quit();
});
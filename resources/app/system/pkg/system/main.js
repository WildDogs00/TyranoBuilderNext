const electron = require('electron');
const {ipcMain, Menu, ipcRenderer} = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let fs = require('fs');

let mainWindow = null;
app.on('ready', () => {
  let path = __dirname + '/package.json';
  let map_package = JSON.parse(fs.readFileSync(path).toString());
  let map_window = map_package["window"];
  console.log(map_package);
  console.log(map_window);

  let width = parseInt(map_window["width"]);
  let height = parseInt(map_window["height"]);
  let resize = map_window["resize"];


  if (process.platform === "win32") {
    if (resize === false) {
      height = height + 20;
    }
  }

  mainWindow = new BrowserWindow({
    "width": width,
    "height": height,
    "resizable": resize,
    "useContentSize": true,
    "show": false,
    webPreferences: {
      nodeIntegration: true
    }
  });


  mainWindow.webContents.setUserAgent(mainWindow.webContents.getUserAgent() + " TyranoElectron");
  mainWindow.loadURL(`file://${__dirname}/index.html`).then(() => {
    // ToDo
  }).catch((error) => {
    console.error(error);
  });

  // ChromiumのDevツールを開く
  //mainWindow.webContents.openDevTools();


  if (map_window["devtools"] === true) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("ready-to-show", () => {
    const Menu = require('electron').Menu;

    if (process.platform === "win32") {
      mainWindow.removeMenu();
      mainWindow.minimize();
      mainWindow.restore();
    } else {
      const templateMenu = [
        {
          label: 'ファイル',
          submenu: [
            {
              label: '終了',
              role: 'close',
            },
          ]
        }
      ];
      let menu = Menu.buildFromTemplate(templateMenu);
      Menu.setApplicationMenu(menu);
    }
    mainWindow.show();
  });
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  ipcMain.on('fullScreen', function () {
    mainWindow.resizable = true;
    mainWindow.setFullScreen(true);
  });
});

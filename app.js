const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow // so long, gay bowser
const { express } = require('./express');

let mainWin;
let devTools = false;

function createWindow() {
    express();
    mainWin = new BrowserWindow({
        width: 480,
        height: 480,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWin.loadURL('http://localhost:3000/');
    mainWin.focus();

    if (devTools) { mainWin.webContents.openDevTools() };

    mainWin.on('closed', function() {
        mainWin = null;
    });
};

app.on('ready', createWindow);
app.on('window-all-closed', function() {
    app.quit();
});

app.on('activate', function() {
    if (mainWin === null) {
        createWindow();
    };
});
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
        },
        darkTheme: true,
        icon: "./src/images/icons/forex.png",
    });

    win.maximize();
    win.loadFile('src/pages/index.html');
}

app.whenReady().then(() => {
    createWindow()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
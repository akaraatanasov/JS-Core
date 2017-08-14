const {app, BrowserWindow} = require('electron');
app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(`file://${__dirname}/Prodavachnik.html`);

    mainWindow.on('closed', () => {
        mainWindow = null
    })
});
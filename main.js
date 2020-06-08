const path = require('path')
const url = require('url')
const { app } = require('electron')
const {mainWindow, createMainWindow} = require('./windowfunctions')






// 

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow()
    }
})

// Stop error
app.allowRendererProcessReuse = true
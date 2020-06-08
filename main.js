const path = require('path')
const url = require('url')
const { app, ipcMain } = require('electron')
const {mainWindow, createMainWindow} = require('./windowfunctions')






// app level events

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



// ipc events 
ipcMain.on('click:increase',(e,data)=>{
    console.log(e);
    console.log(data);
})


// Stop error
app.allowRendererProcessReuse = true
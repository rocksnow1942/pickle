const path = require('path')
const url = require('url')
const { app, BrowserWindow, Menu } = require('electron')

let mainWindow
let aboutWindow

let isDev = false
let isMac = process.platform == 'darwin' ? true : false;

if (
    process.env.NODE_ENV !== undefined &&
    process.env.NODE_ENV === 'development'
) {
    isDev = true
}


// Window functions
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        show: false,
        icon: `${__dirname}/assets/icon.png`,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    let indexPath

    // use react server as index
    if (isDev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:8080',
            pathname: 'index.html',
            slashes: true,
        })
    } else {
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, 'dist', 'index.html'),
            slashes: true,
        })
    }


    mainWindow.loadURL(indexPath)

    // load menu 
    const mainMenu = Menu.buildFromTemplate(menu)
    // attach menu to main window
    Menu.setApplicationMenu(mainMenu)

    // no longer need because created dev tools menu. 
    // globalShortcut.register('CmdOrCtrl+R', () => { mainWindow.reload() })
    // globalShortcut.register('CmdOrCtrl+I', () => { mainWindow.toggleDevTools() })
    // garbage collect. 
    mainWindow.on('ready', () => mainWindow = null)


    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()

        // Open devtools if dev
        if (isDev) {
            const {
                default: installExtension,
                REACT_DEVELOPER_TOOLS,
            } = require('electron-devtools-installer')

            installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
                console.log('Error loading React DevTools: ', err)
            )
            // mainWindow.webContents.openDevTools()
        }
    })
    mainWindow.on('closed', () => (mainWindow = null))
}



function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        title: 'About Cube',
        width: 300,
        height: 200,
        icon: path.join(__dirname, 'assets', 'icon.png'),
        resizable: isDev ? true : false,
        backgroundColor: 'white'

    })
    aboutWindow.loadFile('./app/about.html')
}



// menu for main window
const menu = [
    ...(isMac ? [{
        label: "HAHA",
        submenu: [
            {
                label: 'About Cube',
                click: createAboutWindow
            }
        ]
    }] : []),
    ...(isDev ? [{
        label: 'Developer',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' }
        ]
    }] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: "CmdOrCtrl+W",
                click: app.quit,
            }
        ]
    },
]




module.exports = {createAboutWindow,createMainWindow,mainWindow,aboutWindow}
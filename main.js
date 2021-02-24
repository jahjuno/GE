const { app, BrowserWindow } = require('electron')
const PORT = process.env.gePORT

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration : true
    }
  })

  win.loadURL(`http://localhost:${PORT}/index.html`)

  //plein écran
  win.maximize()

  //ouvrir un devtools
  //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
})
const { app, BrowserWindow, Menu, dialog} = require('electron')
const PORT = process.env.gePORT

function createWindow () {
    const win = new BrowserWindow({
    width: 900,
    height: 700,
    center: true,

    webPreferences: {
      //intégration de NodeJS dans un projet
      nodeIntegration : true
    }
  })

const menu = Menu.buildFromTemplate(
  [
    {
      label : "Fichier",
    },
    {
      label : "A propos",
      submenu :[
        {
          label : "Logiciel",
          click : () =>{
            let apropos = dialog.showMessageBox(win, {
              title : "A PROPOS DU LOGICIEL",
              message : "\nGE est un logiciel de Gestion d'Etablissement.\n GE V1.0.0",
            });
          }
      },
      {
        label : "Développeurs",
      }
      ]
     
    }
  ]
);
Menu.setApplicationMenu(menu);

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
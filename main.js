const { app, BrowserWindow, Menu, dialog} = require('electron')
const PORT = process.env.gePORT

function createWindow () {
    const win = new BrowserWindow({
    width: 1366,
    height: 768,
    center: true,
    minWidth: 1366,
    minHeight: 768,
    show: false,
    maxWidth: 1366,
    maxHeight: 768,

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
              message : "\nGE est un logiciel de Gestion d'Etablissement.\n GE V2.1.1",
            });
          }
        },
      {
        label : "Développeurs",
        click : () => {
          let devprs = dialog.showMessageBox(win,  {
            title : "A PROPOS DU DEVELOPPEUR",
            message : "En cours ...",
          });
        }
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
  win.webContents.openDevTools()
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
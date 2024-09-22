const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

  // Tạo cửa sổ trình duyệt
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false  // Tắt bảo mật web để tránh lỗi CORS
      },
      
  });

  // Nạp ứng dụng React sau khi build
  mainWindow.loadFile('build/index.html');
}

// Khởi tạo ứng dụng Electron
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

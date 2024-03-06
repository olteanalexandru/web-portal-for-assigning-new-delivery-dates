// list-routes.js
const fs = require('fs');
const path = require('path');

function listRoutes(dir, filelist = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = listRoutes(filePath, filelist);
    } else {
      filelist.push(filePath);
    }
  });

  return filelist;
}

const routeDir = path.resolve(__dirname, 'src/routes');
const routes = listRoutes(routeDir);

console.log('Available routes:');
routes.forEach((route) => {
  console.log(route.replace(routeDir, ''));
});
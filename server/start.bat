@echo off
echo.

set NodePackagesPath=D:\Download\url-chat-master\url-chat-master\test\server // This is my path, you can edit them

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production

echo Environment variables are successfully added.
echo. 
echo. 
echo. 

node index.js

pause
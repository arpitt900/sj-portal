@echo off
echo ===================================================
echo Shreeji Jewels Portal - Windows Installation Script
echo ===================================================
echo.

REM Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed or not in PATH
  echo Please install Node.js from https://nodejs.org/
  echo and run this script again.
  exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2,3 delims=." %%a in ('node -v') do (
  set NODE_MAJOR=%%a
  set NODE_MINOR=%%b
  set NODE_PATCH=%%c
)
set NODE_MAJOR=%NODE_MAJOR:~1%

if %NODE_MAJOR% LSS 18 (
  echo ERROR: Node.js version 18 or higher is required
  echo Current version: %NODE_MAJOR%.%NODE_MINOR%.%NODE_PATCH%
  echo Please update Node.js and run this script again.
  exit /b 1
)

echo Node.js version: %NODE_MAJOR%.%NODE_MINOR%.%NODE_PATCH% - OK

REM Create .env.local if it doesn't exist
if not exist .env.local (
  echo Creating .env.local from template...
  copy .env.local.example .env.local
  echo Please edit .env.local with your configuration.
  notepad .env.local
)

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Failed to install dependencies
  exit /b 1
)

REM Build the application
echo Building the application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Failed to build the application
  exit /b 1
)

echo.
echo ===================================================
echo Installation completed successfully!
echo.
echo To start the application:
echo   npm run start
echo.
echo To install as a Windows service:
echo   node scripts/install-windows-service.js
echo ===================================================

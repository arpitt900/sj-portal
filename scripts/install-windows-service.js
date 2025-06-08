// Script to install the application as a Windows service
const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")

// Check if running as administrator
exec("net session", (error) => {
  if (error) {
    console.error("ERROR: This script must be run as Administrator")
    console.error('Please right-click on Command Prompt and select "Run as administrator"')
    process.exit(1)
  }

  console.log("Installing Shreeji Jewels Portal as a Windows service...")

  // Check if PM2 is installed
  exec("pm2 --version", (error) => {
    if (error) {
      console.log("Installing PM2...")
      exec("npm install -g pm2 pm2-windows-startup", (error) => {
        if (error) {
          console.error("Failed to install PM2:", error)
          process.exit(1)
        }
        setupPM2()
      })
    } else {
      setupPM2()
    }
  })
})

function setupPM2() {
  console.log("Setting up PM2...")

  // Set up PM2 to start with Windows
  exec("pm2-startup install", (error) => {
    if (error) {
      console.error("Failed to set up PM2 startup:", error)
      process.exit(1)
    }

    // Create ecosystem file
    const ecosystemConfig = {
      apps: [
        {
          name: "shreeji-jewels",
          script: "npm",
          args: "start",
          cwd: process.cwd(),
          env: {
            NODE_ENV: "production",
          },
          log_date_format: "YYYY-MM-DD HH:mm:ss",
        },
      ],
    }

    fs.writeFileSync(
      path.join(process.cwd(), "ecosystem.config.js"),
      `module.exports = ${JSON.stringify(ecosystemConfig, null, 2)}`,
    )

    // Start the application with PM2
    exec("pm2 start ecosystem.config.js", (error) => {
      if (error) {
        console.error("Failed to start application with PM2:", error)
        process.exit(1)
      }

      // Save the PM2 configuration
      exec("pm2 save", (error) => {
        if (error) {
          console.error("Failed to save PM2 configuration:", error)
          process.exit(1)
        }

        console.log("✅ Shreeji Jewels Portal has been installed as a Windows service")
        console.log("✅ The application will start automatically when Windows starts")
        console.log("✅ You can manage the service using these commands:")
        console.log("   - pm2 status: Check service status")
        console.log("   - pm2 stop shreeji-jewels: Stop the service")
        console.log("   - pm2 start shreeji-jewels: Start the service")
        console.log("   - pm2 restart shreeji-jewels: Restart the service")
        console.log("   - pm2 logs shreeji-jewels: View service logs")
      })
    })
  })
}

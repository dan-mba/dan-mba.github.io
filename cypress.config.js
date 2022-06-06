const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    supportFile: false,
    specPattern: 'cypress/integration/**/*.js',
    setupNodeEvents(on) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        // `args` is an array of all the arguments that will
        // be passed to browsers when it launches

        if (browser.isHeadless) {
          // disable WebGL for headless browsers
          launchOptions.args.push('--disable-gpu')
          launchOptions.args.push('--disable-software-rasterizer')
        }

        // whatever you return here becomes the launchOptions
        return launchOptions
      })
    }
  }
})


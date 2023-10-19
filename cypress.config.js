const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    viewportHeight:720,
    viewportWidth:1280,
    defaultCommandTimeout: 6000,
    requestTimeout:6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

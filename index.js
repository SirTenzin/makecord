#! /usr/bin/env node
const app = require('./src/app');
const App = new app();

(async () => {
    await App.start(process.argv);
})();
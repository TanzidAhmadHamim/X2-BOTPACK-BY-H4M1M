console.clear();
const { spawn } = require("child_process");
const express = require("express");
const app = express();
const chalk = require('chalk');
const logger = require("./hamimc.js");
const path = require('path');
const PORT = process.env.PORT || 8080 || 9000 || 5555 || 5050 || 5000 || 3003 || 2000 || 1029 || 1010;
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/website/hamim.html'));
});
console.clear();
function startBot(message) {
    (message) ? logger(message, "starting") : "";
  console.log(chalk.blue('• X2 DEPLOYING X2 SYSTEM •'));
  logger.loader(`deploying app on port ${chalk.blueBright(PORT)}`);
  app.listen(logger.loader(`app deployed on port ${chalk.blueBright(PORT)}`));
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "hamimb.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
  child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot();
            global.countRestart += 1;
            return;
        } else return;
    });

  child.on("error", function(error) {
    logger("an error occurred : " + JSON.stringify(error), "error");
  });
};
startBot();
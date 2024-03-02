const chalk = require('chalk');
const gradient= require('gradient-string');
const chalkAnimation = require('chalkercli');
const color = gradient('blue', 'purple');
const crayon = gradient('yellow', 'lime', 'green');
const blu = gradient("#243aff", "#4687f0", "#5800d4");
const sky = gradient('#0905ed','#346eeb', '#344feb');
const config = require("../configs/console.json");
var successColor = config.console.success;
const errorColor = config.console.error;
const warnColor = config.console.warn;

module.exports = (text, type) => {
  switch (type) {
		case "warn":
			process.stderr.write(chalk[`${warnColor}`](config.console.editNames.warn) + ` - ${text}\n`);
			break;
		case "error":
			process.stderr.write(chalk[`${errorColor}`](config.console.editNames.error) + ` - ${text}\n`);
			break;
		case "load":
      process.stderr.write(chalk[`${successColor}`]('new user') + `- ${text}\n`);
			break;
		default:
			process.stderr.write(chalk[`${successColor}`](type) + ` - ${text}\n`);
			break;
	}
};
module.exports.error = (text, type) => {
	process.stderr.write(chalk[`${errorColor}`](config.console.editNames.error) + ` - ${text}\n`);
};

module.exports.err = (text, type) => {
  process.stderr.write(chalk[`${errorColor}`](config.console.editNames.error) + ` - ${text}\n`);
};

module.exports.warn = (text, type) => {
	process.stderr.write(chalk[`${warnColor}`](config.console.editNames.warn) + ` - ${text}\n`);
};


module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			process.stderr.write(chalk[`${warnColor}`](config.console.editNames.warn) + ` - ${data}\n`);
			break;
		case "error":
			process.stderr.write(chalk[`${errorColor}`](`${config.console.editNames.error}`) + ` - ${data}\n`);
			break;
		default:
			process.stderr.write(chalk[`${successColor}`](`${config.console.editNames.success}`) + ` - ${data}\n`);
			break;
	}
}
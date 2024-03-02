module.exports = function({ api, models }) {
setInterval(function () {
	if(global.config.notification) {
require("./handle/handleNotification.js")({ api });
	}
}, 1000*60);
const Users = require("./controllers/users")({ models, api }),
Threads = require("./controllers/threads")({ models, api }),
Currencies = require("./controllers/currencies")({ models });
const logger = require("../catalogs/hamimc.js");
const chalk = require("chalk");
const gradient= require("gradient-string");
const crayon = gradient('yellow', 'lime', 'green');
const sky = gradient('#3446eb', '#3455eb', '#3474eb');
	
(async function () {
		try {
      const process = require("process");
			const [threads, users] = await Promise.all([Threads.getAll(), Users.getAll(['userID', 'name', 'data'])]);
			threads.forEach(data => {
				const idThread = String(data.threadID);
				global.data.allThreadID.push(idThread);
				global.data.threadData.set(idThread, data.data || {});
				global.data.threadInfo.set(idThread, data.threadInfo || {});
				if (data.data && data.data.banned) {
					global.data.threadBanned.set(idThread, {
						'reason': data.data.reason || '',
						'dateAdded': data.data.dateAdded || ''
					});
				}
				if (data.data && data.data.commandBanned && data.data.commandBanned.length !== 0) {
					global.data.commandBanned.set(idThread, data.data.commandBanned);
				}
				if (data.data && data.data.NSFW) {
					global.data.threadAllowNSFW.push(idThread);
				}
			});
			users.forEach(dataU => {
				const idUsers = String(dataU.userID);
				global.data.allUserID.push(idUsers);
				if (dataU.name && dataU.name.length !== 0) {
					global.data.userName.set(idUsers, dataU.name);
				}
				if (dataU.data && dataU.data.banned) {
					global.data.userBanned.set(idUsers, {
						'reason': dataU.data.reason || '',
						'dateAdded': dataU.data.dateAdded || ''
					});
				}
				if (dataU.data && dataU.data.commandBanned && dataU.data.commandBanned.length !== 0) {
					global.data.commandBanned.set(idUsers, dataU.data.commandBanned);
				}
			});
			global.loading(`deployed ${chalk.blueBright(`${global.data.allThreadID.length}`)} groups and ${chalk.blueBright(`${global.data.allUserID.length}`)} users\n\n${chalk.blueBright(`X2 PROJECT VERSION 4.0.0`)}\n`, "• X2 DATA •");
		} catch (error) {
			logger.loader(`can't load environment variable, error : ${error}`, 'error');
		}
	})();	

const operator = global.config.OPERATOR.length;
const admin = global.config.ADMINBOT.length;
const approved = global.approved.APPROVED.length;
const premium = global.premium.PREMIUMUSERS.length;
console.log(`${crayon(``)}${sky(`• X2 DATA •`)} - bot name : ${chalk.blueBright((!global.config.BOTNAME) ? "Hamim" : global.config.BOTNAME)} \n${sky(`• X2 DATA •`)} - bot id : ${chalk.blueBright(api.getCurrentUserID())} \n${sky(`• X2 DATA •`)} - bot prefix : ${chalk.blueBright(global.config.PREFIX)}\n${sky(`• X2 DATA •`)} - deployed ${chalk.blueBright(operator)} bot operators and ${chalk.blueBright(admin)} admins`);
if (global.config.approval) {
  console.log(`${sky(`• X2 DATA •`)} - deployed ${chalk.blueBright(approved)} approved groups`)
} 
if (global.config.premium) {
  console.log(`${sky(`• X2 DATA •`)} - deployed ${chalk.blueBright(premium)} premium users`)
}

const handleCommand = require("./handle/handleCommand.js")({ api, Users, Threads, Currencies, models });
const handleCommandEvent = require("./handle/handleCommandEvent.js")({ api, Users, Threads, Currencies, models });
const handleReply = require("./handle/handleReply.js")({ api, Users, Threads, Currencies, models });
const handleReaction = require("./handle/handleReaction.js")({ api, Users, Threads, Currencies, models });
const handleEvent = require("./handle/handleEvent.js")({ api,  Users, Threads, Currencies, models });
const handleCreateDatabase = require("./handle/handleCreateDatabase.js")({  api, Threads, Users, Currencies, models });

	
return (event) => {
		switch (event.type) {
			case "message":
			case "message_reply":
			case "message_unsend":
				handleCreateDatabase({ event });
				handleCommand({ event });
				handleReply({ event });
				handleCommandEvent({ event });
				break;
			case "change_thread_image": 
				break;
			case "event":
				handleEvent({ event });
				break;
			case "message_reaction":
				handleReaction({ event });
				break;
			default:
				break;
		}
	};
};
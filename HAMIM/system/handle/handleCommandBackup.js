module.exports = function({ api, models, Users, Threads, Currencies }) {
  const stringSimilarity = require('string-similarity'),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../catalogs/hamimc.js");
  const axios = require('axios')
  const moment = require("moment-timezone");
  return async function({ event }) {
    const dateNow = Date.now()
    const time = moment.tz("Asia/Manila").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, adminOnly, keyAdminOnly } = global.ryuko;
    const { PREFIX, ADMINBOT, developermode, OPERATOR, approval } = global.config;
    const { APPROVED } = global.approved;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {}
    const args = (body || '').trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    var command = commands.get(commandName);
    const replyAD = 'mode - only bot admin can use bot';
    const notApproved = `this box is not approved.\nuse "${PREFIX}request" to send a approval request from bot operators`;
    if (typeof body === "string" && body.startsWith(`${PREFIX}request`) && approval) {
      if (APPROVED.includes(threadID)) {
        return api.sendMessage('this box is already approved', threadID, messageID)
      }
      let ryukodev;
      let request;
      try {
        const groupname = await global.data.threadInfo.get(threadID).threadName || "name does not exist";
        ryukodev = `group name : ${groupname}\ngroup id : ${threadID}`;
        request = `${groupname} group is requesting for approval`
      } catch (error) {
        const username = await Users.getNameUser(threadID) || "facebook user";
        ryukodev = `user id : ${threadID}`;
        request = `${username} bot user is requesting for approval`;
      }
      return api.sendMessage(`${request}\n\n${ryukodev}`, OPERATOR[0], () => {
        return api.sendMessage('your approval request has been sent from bot operator', threadID, messageID);
      });
    }
    if (command && (command.config.name.toLowerCase() === commandName.toLowerCase()) &&(!APPROVED.includes(threadID) && !OPERATOR.includes(senderID) && !ADMINBOT.includes(senderID) && approval)) {
      return api.sendMessage(notApproved, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          });
    }
    if (typeof body === 'string' && body.startsWith(PREFIX) && (!APPROVED.includes(threadID) && !OPERATOR.includes(senderID) && !ADMINBOT.includes(senderID) && approval)) {
      return api.sendMessage(notApproved, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          });
    }
    if (command && (command.config.name.toLowerCase() === commandName.toLowerCase()) && (!ADMINBOT.includes(senderID) && !OPERATOR.includes(senderID) && adminOnly && senderID !== api.getCurrentUserID())) {
      return api.sendMessage(replyAD, threadID, messageID);
    }
    if (typeof body === 'string' && body.startsWith(PREFIX) && (!ADMINBOT.includes(senderID) && adminOnly && senderID !== api.getCurrentUserID())) {
      return api.sendMessage(replyAD, threadID, messageID);
    }


    if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) {
      if (!ADMINBOT.includes(senderID.toString()) && !OPERATOR.includes(senderID.toString()))
      {
        if (command && (command.config.name.toLowerCase() === commandName.toLowerCase()) && userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(`you're unable to use bot\nreason : ${reason}\ndate banned : ${dateAdded}`, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        } else {
          if (command && (command.config.name.toLowerCase() === commandName.toLowerCase()) && threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            }, messageID);
          }
        } 
        if (typeof body === 'string' && body.startsWith(PREFIX) && userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(`you're unable to use bot\nreason : ${reason}\ndate banned : ${dateAdded}`, threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        } else {
          if (typeof body === 'string' && body.startsWith(PREFIX) && threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            }, messageID);
          }
        }

      }
    }

    if (commandName.startsWith(PREFIX)) {
      if (!command) {
        const allCommandName = Array.from(commands.keys());
        const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
        if (checker.bestMatch.rating >= 0.5) {
          command = commands.get(checker.bestMatch.target);
        } else {
          return api.sendMessage(global.getText("handleCommand", "commandNotExist", checker.bestMatch.target), threadID, messageID);
        }
      }
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID) && !OPERATOR.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000))
            return api.unsendMessage(info.messageID);
          }, messageID);
        if (banUsers.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
      }
    }
    const premium = global.config.premium;
    const premiumlists = global.premium.PREMIUMUSERS;
    if (premium) {
      if (command && command.config) {
        if (command.config.premium && !premiumlists.includes(senderID)) {
          return api.sendMessage(`the command you used is only for premium users. If you want to use it, you can contact the admins and operators of the bot or you can type ${PREFIX}requestpremium.`, event.threadID, async (err, eventt) => {
            if (err) {
              return;
            }
              await new Promise(resolve => setTimeout(resolve, 5 * 1000))
              return api.unsendMessage(eventt.messageID);
          }, event.messageID);
        }
      }
    }

    if (command && command.config) {
      if (command.config.prefix === false && commandName.toLowerCase() !== command.config.name.toLowerCase()) {
        api.sendMessage(global.getText("handleCommand", "notMatched", command.config.name), event.threadID, event.messageID);
        return;
      }
      if (command.config.prefix === true && !body.startsWith(PREFIX)) {
        return;
      }
    }
    if (command && command.config) {
      if (typeof command.config.prefix === 'undefined') {
        api.sendMessage(global.getText("handleCommand", "noPrefix", command.config.name), event.threadID, event.messageID);
        return;
      }
    }


    if (command && command.config && command.config.category && command.config.category.toLowerCase() === 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !ADMINBOT.includes(senderID))
      return api.sendMessage(global.getText("handleCommand", "threadNotAllowNSFW"), threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 = (threadInfo.get(threadID) || await Threads.getInfo(threadID))
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
    var permssion = 0;
    var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const Find = threadInfoo.adminIDs.find(el => el.id == senderID);
    const ryuko = '!OPERATOR.includes(senderID)';
    if (OPERATOR.includes(senderID.toString())) permssion = 3;
    else if (ADMINBOT.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && ryuko && Find) permssion = 1;
    if (command && command.config && command.config.permission && command.config.permission > permssion) {
      return api.sendMessage(global.getText("handleCommand", "permissionNotEnough", command.config.name), event.threadID, event.messageID);
    }

    if (command && command.config && !client.cooldowns.has(command.config.name)) {
      client.cooldowns.set(command.config.name, new Map());
    }

    const timestamps = command && command.config ? client.cooldowns.get(command.config.name) : undefined;

    const expirationTime = (command && command.config && command.config.cooldowns || 1) * 1000;

    if (timestamps && timestamps instanceof Map && timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime)

      return api.setMessageReaction('🕚', event.messageID, err => (err) ? logger('An error occurred while executing setMessageReaction', 2) : '', !![]);
    var getText2;
    if (command && command.languages && typeof command.languages === 'object' && command.languages.hasOwnProperty(global.config.language))

      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || '';
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp('%' + i, 'g');
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => { };
    try {
      const Obj = {
        api: api,
        event: event,
        args: args,
        models: models,
        Users: Users,
        Threads: Threads,
        Currencies: Currencies,
        permssion: permssion,
        getText: getText2
      };

      if (command && typeof command.run === 'function') {
        command.run(Obj);
        timestamps.set(senderID, dateNow);

        if (developermode == !![]) {
          logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" "), (Date.now()) - dateNow) + '\n', "command");
        }

        return;
      }
    } catch (e) {
      return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
    }
  };
};
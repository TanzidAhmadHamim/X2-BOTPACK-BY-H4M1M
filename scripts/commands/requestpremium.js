module.exports.config = {
  name: 'requestpremium',
  version: '1.0.0',
  permission: 0,
  prefix : false,
  premium: false,
  category: 'system',
  cooldown: 100,
  description: 'request premium',
  ussage: 'requestpremium'
}

module.exports.run = async function({ api, args, event, Users }) {
  const { sendMessage, unsendMessage } = api;
  const { threadID, messageID, senderID} = event;
  if (global.config.premium) {
    var message = args.join(" ");
    if (!message) {
      return sendMessage(`please enter a message.`, threadID, messageID);
    }
    var username;
    try {
      username = await Users.getNameUser(senderID);
    } catch (error) {
      username = "facebook user";
    }
    const OPERATOR = global.config.OPERATOR[0];
    return sendMessage(`${username} is requesting for premium membership\n\nuserid : ${senderID}\nmessage : ${message}`, OPERATOR, (err) => {
      if (err) return;
      return sendMessage(`your request has been sent from bot operator`, threadID, messageID);
    });
  } else {
    return sendMessage(`premium system is not turned on`, threadID, (err) => {
      if (err) {
        return;
      }
    }, messageID)
  }
}
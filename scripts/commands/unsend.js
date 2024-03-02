module.exports.config = {
  name: "uns",
  version: "1.0.0", 
  permssion: 0,
  premium: false,
  prefix: false,
  credits: "hulaanmo",
  description: "Remove Bot's messages",
  category: "System", 
  usages: "", 
  cooldowns: 0,
  dependencies: [] 
};
module.exports.languages = { "vi": 
   { "unsendErr1": "Không thể gỡ tin nhắn của người khác.",
 "unsendErr2": "Hãy reply tin nhắn cần gỡ." }, 
"en": { "unsendErr1": "Can't to unsend message from other user.",
        "unsendErr2": "Reply to the message you want to unsend." } }
module.exports.run = async function({ api, event, args, Users }) {
  if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText('unsendErr1'), event.threadID, event.messageID);
      if (event.type != "message_reply") return api.sendMessage(getText('unsendErr2'), event.threadID, event.messageID);
      return api.unsendMessage(event.messageReply.messageID, err => (err) ? api.sendMessage(getText('error'), event.threadID, event.messageID) : '');
}
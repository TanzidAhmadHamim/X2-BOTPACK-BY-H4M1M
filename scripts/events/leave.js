module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "Nayan",
  description: "notify leave.",
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } =  global.nodemodule["path"];
  const { threadID } = event;
  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "ʙᴀɪʀ ʜᴏɪ ɢᴇꜱᴇ☹️" : "ᴛᴀᴛᴀ😒🤙!";
  const path = join(__dirname, "Hamim", "leave");
  const gifPath = join(path, `leave.gif`);
  var msg, formPush

  if (existsSync(path)) mkdirSync(path, { recursive: true });

  (typeof data.customLeave == "undefined") ? msg = "╭──────•◈•───────╮\n |        🄷🄰🄼🄸🄼🄱🄾🅃        \n |ᴀꜱꜱᴀʟᴀᴍᴜᴀʟᴀɪᴋᴜᴍ\n |Dᴇᴀʀ, {name}\n |ᴀʟʟᴀʜ-ʜᴀꜰᴇᴢ\n |ʀᴇᴀꜱᴏɴ:{type}\n |ᴏᴡɴᴇʀ: \n |         ʜᴀᴍɪᴍ&ᴋᴏᴛʜᴀ\n╰──────•◈•───────╯ " : msg = data.customLeave;
  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

  if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
  else formPush = { body: msg }

  return api.sendMessage(formPush, threadID);
}
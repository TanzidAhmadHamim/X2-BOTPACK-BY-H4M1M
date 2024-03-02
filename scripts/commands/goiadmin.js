module.exports.config = {
  name: "goiadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  permssion: 0,
  prefix: false,
  premium: false,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  category: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100080456630885","100080456630885","100080456630885") {
    var aid = ["100080456630885","100080456630885","100080456630885"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Ufff🥵..☠️ Etto dakte hoi amar Boss tare..amar boss shodo amr disturb korba nah..😑"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
module.exports.config = {
  name: "xvideo",
  version: "11.9.7",
  permssion: 0,
  premium: false,
  prefix: true,
  credits: "Hamim",
  description: "redroom vids",
  category: "Not For Kids",
  usages: "",
  cooldowns: 30,
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var red = ["https://66c60f21-4451-43f7-991b-7952c3adb74c-00-1dozanv79s6si.pike.replit.dev/"]
  var redroom = red[Math.floor(Math.random() * red.length)]
  axios.get(redroom).then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `--『 𝐇𝟒𝐌𝟏𝐌  🄱🄾🅃 』--`,
            attachment: fs.createReadStream(__dirname + `/data/kanna.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/data/kanna.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/data/kanna.${ext}`)).on("close", callback);
      })
}
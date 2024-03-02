module.exports.config = {
	name: "Hamim",
	version: "1.0.1", 
	permssion: 0,
  premium: false,
  prefix: false,
	credits: "Hamim",
	description: "Admin info",
	category: "...",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
var link =[
  "https://i.postimg.cc/s2nNXsnX/tanvir6x9official.jpg", 
            
            "https://i.imgur.com/DA7EoVx.jpg", 
            
"https://i.imgur.com/HTLhzWW.jpg",
            
            "https://i.imgur.com/N2tNu0u.jpg"
					];
  
var callback = () => api.sendMessage({body:`𝗡𝗮𝗺𝗲       : Tanzid Ahmad Hamim \n𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : Hamim Hosenx\n𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻    : ISLAM\n𝗣𝗲𝗿𝗺𝗮𝗻𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : ❤️‍🔥Chattogram🔥\n𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : NO NEED TO KNOW \n𝗚𝗲𝗻𝗱𝗲𝗿     : Male\n𝗔𝗴𝗲            :  17\n𝗪𝗼𝗿𝗸         :  Student  \n𝗚𝗺𝗮𝗶𝗹        :  hamimhosenx@gmail.com\n𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :  wa.me/+8801876401888\n𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺  : X2_IS_HERE\n𝗙𝗯 𝗹𝗶𝗻𝗸   : https://www.facebook.com/HACKER.HAMIM.BHAI
`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };
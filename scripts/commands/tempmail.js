module.exports.config = {
  name: "tempmail",
  version: "1.0.",
  permission: 0,
  credits: "James, CREDITS SENSUI FOR THE API ←(*꒪ヮ꒪*)",
  prefix: true,
  premium: false,
  description: "Generate free temporary email",
  category: "generate",
  usages: `"gen" = generate email\n"inbox" = check email messages`,
  cooldowns: 5,
};
module.exports.run = async ({ api, event, args }) => {
    const axios = require('axios');
    let { threadID, messageID } = event;
    
   
    if (!args[0]) {
        api.sendMessage(`usage: ${global.config.PREFIX}tempmail gen\n\nTo get the messages:\n\nuse ${global.config.PREFIX}tempmail inbox [email]\nexample: ${global.config.PREFIX}tempmail inbox culyqdbm78o3@kzccv.com`, threadID, messageID);
    }
    else if (args[0] == "create") {
        const url1 = await axios.get(`https://tempmail-api.codersensui.repl.co/api/gen`);
        const email = url1.data.email;
  return api.sendMessage(`here's your temporary email :\n${email}`, threadID, messageID);
    }
    else if (args[0] == "inbox") {
    const text = args[1];
      const url2 = await axios.get(`https://tempmail-api.codersensui.repl.co/api/getmessage/${text}`);
        const mess = url2.data.messages[0].message;
      const sub = url2.data.messages[0].subject;
      const sender = url2.data.messages[0].sender;
      
           return api.sendMessage(`here's the inbox of ${text}\n\nsender : ${sender}\nsubject : ${sub}\nmessage : ${mess}`, threadID, messageID);
    }
    
};
module.exports.config = {
    name: "teach",
    version: "1",
    permission: 0,
    credits: "Hamim",
    prefix: false,
    premium: false,
    description: "Teach X2 Simsimi",
    usages: "Teach",
    category: "...",
    cooldowns: 0
};

const axios = require("axios");

module.exports.run = async ({ api, event, args }) => {
    try {

        const text = args.join(" ");
        const text1 = text.substr(0, text.indexOf(" => "));
        const text2 = text.split(" => ").pop();

        if (!text1 || !text2) {
            return api.sendMessage(`Usage: ${global.config.PREFIX}teach who is x2? => x2 is hamim`, event.threadID, event.messageID);
        }

        const response = await axios.get(`https://052ffdc5-d547-47f5-b9d3-a96a656bbaa1-00-3s1trre0zg6jq.sisko.replit.dev//sim?type=teach&ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`);
        api.sendMessage(`Thank you for teaching..your text added to X2 server.`, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong in x2 server.", event.threadID, event.messageID);
    }
};
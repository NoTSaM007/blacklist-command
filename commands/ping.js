const discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "ping",
  aliases: [],
  description: "",
  run: async (client, message, args) => {
//Now i will show you how it will be added to the commands, what i will type under this is a must in every single command
    
    let blacklisted = db.fetch(`blacklist_${message.author.id}`)
    if(blacklisted === 1) return message.channel.send("You are blacklisted and cannot use my commands")
    
    message.channel.send("Pong")
  }
}
  
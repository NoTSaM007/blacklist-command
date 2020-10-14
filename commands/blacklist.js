const discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "blacklist",
  aliases: [],
  description: "Blacklist a user from using the bot",
  run: async (client, message, args) => {
    if(message.author.id !== "402490971041824768") return message.channel.send("This can only be ran by the bot owner!")
    
    let user = message.mentions.members.first()
    if(!user) return message.channel.send("You forgot to specify a user!")
    let blacklisted = db.fetch(`blacklist_${user.id}`)
    
    if(blacklisted === 1) return message.channel.send(`${user} is already blacklisted`)
    
    message.channel.send(`${user} has been blacklisted`)
    db.add(`blacklist_${user.id}`, 1)
  }
}
  
const discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "whitelist",
  aliases: [],
  description: "Remove the blacklist from a user",
  run: async (client, message, args) => {
    if(message.author.id !== "402490971041824768") return message.channel.send("Only the bot owner can use this command")
    
    let user = message.mentions.members.first()
    if(!user) return message.channel.send("You did not specify a user")

    let blacklisted = db.fetch(`blacklist_${user.id}`)
    
    if(blacklisted === 0 || blacklisted === null) return message.channel.send(`${user} is not blacklisted`)
    
    message.channel.send(`${user} has been whitelisted\nNo longer blacklisted`)
    db.subtract(`blacklist_${user.id}`, 1)
  }
}
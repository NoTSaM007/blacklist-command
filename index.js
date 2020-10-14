const fs = require("fs");
const discord = require("discord.js");
const prefix = "!";
const client = new discord.Client();
const db = require("quick.db")

client.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith("js"));

client.aliases = new discord.Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  command.aliases.forEach(alias => client.aliases.set(alias, command.name));
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("Im online" + ` ${client.user.tag}`);
});

client.on("message", async message => {
  
  if(!message.content.startsWith(prefix)){  // Spelling mistake :/
    db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
  }
  
  if (message.author.bot) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (cmd === null) return;

  if (cmd) cmd.run(client, message, args);
  if (!cmd) return;
});


client.login(process.env.TOKEN);

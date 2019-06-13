const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client()
client.prefix = config.prefix;

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)){
        return message.reply("Hello, my prefix é `-`")}
    if(!message.content.startsWith(config.prefix)) return;

let args = message.content.split(" ").slice(1);
let command = message.content.split(" ")[0];
command = command.slice(config.prefix.length);
  try {
      let commandFile = require(`./commands/${command}.js`);
      delete require.cache[require.resolve(`./commands/${command}.js`)];
      return commandFile.run(client, message, args);
  } catch (err) {
        console.error("Erro:" + err)
  }
})

client.on("ready", () => {
    console.log(`Bot started with, ${client.users.size} users, ${client.guilds.size} servers, ${client.channels.size} channels.`)

    let messages = [`Watching ${client.users.size} people`,
                    `I'm in ${client.guilds.size} servers`]

    setInterval(() => {
        let randomMessages = Math.floor(Math.random() * (messages.length - 1) + 1)
        client.user.setActivity(messages[randomMessages])
    }, 10000)

    //0 = Playing
    //1 = Transmitting
    //2 = Listening
    //3 = Watching
})

client.login(config.token)

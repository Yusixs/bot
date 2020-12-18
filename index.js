const { prefix, token } = require('./config.json');
const read = require('fs-readdir-recursive');
const Discord = require('discord.js');
const Sequelize = require('sequelize');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandDirs = read('./commands').filter(file => file.endsWith('.js'));
console.log(`Loading ${commandDirs.length} commands!`);

for (const file of commandDirs) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.help.name, command);
}

const ShoobNotify = require('./data/Shoob/shoob_notify.js');
const levelrole = require('./data/scripts/levelrole.js');
const wordsplay = require('./data/scripts/wordsplay.js');

bot.once('ready', () => {
	console.log('Ready!');
});

bot.on('message', message => {
	ShoobNotify(bot, message);
	levelrole(bot, message);
	wordsplay(bot, message);
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = bot.commands.get(commandName)
                  || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

	if (!command) return;

	if (command.help.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');

	if (command.help.args && !args.length)	{
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.help.usage) reply += `\nThe proper usage would be: \`${prefix}${command.help.name} ${command.help.usage}\``;
		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.help.name)) cooldowns.set(command.help.name, new Discord.Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.help.name);
	const cooldownAmount = (command.help.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.help.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.run(bot, message, args);
	}
	catch (e) {
		console.log(e);
		message.channel.send('There was an error executing this command, please contact Yusixs#3763');
	}
});

bot.login(token);
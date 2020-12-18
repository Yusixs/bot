const { prefix } = require('../../config.json');

module.exports.run = async (bot, message, args) => {
	const data = [];
	const { commands } = message.client;
	console.log(commands);

	if (!args.length) {
		data.push('Here\'s a list of all my commands:');
		data.push(commands.map(command => command.help.name).join(', '));
		data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);


		await message.author.send(data, { split: true });
		try {
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with all my commands!');
		}
		catch(e) {
			console.error(`Could not send help DM to ${message.author.tag}.\n`, e);
			message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		}
	}

	const cmdName = args[0].toLowerCase();
	const command = commands.get(cmdName) || commands.find(c => c.aliases && c.aliases.includes(cmdName));
	if (!command)	return message.reply('that\'s not a valid command!');

	data.push(`**Name:** ${command.help.name}`);
	data.push(`**Cooldown:** ${command.help.cooldown || 3} second(s)`);
	if (command.help.aliases) data.push(`**Aliases:** ${command.help.aliases.join(', ')}`);
	if (command.help.description) data.push(`**Description:** ${command.help.description}`);
	if (command.help.usage) data.push(`**Usage:** ${prefix}${command.help.name} ${command.help.usage}`);

	message.channel.send(data, { split: true });

};

module.exports.help = {
	name: 'help',
	aliases: ['info', '?'],
	description: 'Dynamic Help command',
	guildOnly: true,
	args: false,
	usage: '',
	cooldown: 5,
};
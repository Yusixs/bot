const iQuote = require('inspirational-quotes');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const quote = iQuote.getQuote();
	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(quote.author)
		.setDescription(quote.text);

	message.channel.send(embed);
};

module.exports.help = {
	name: 'quote',
	aliases: ['inspire'],
	description: 'Sends a random inspirational quote. Please reach out to those who are feeling depressed!',
	guildOnly: false,
	args: false,
	usage: '',
	cooldown: 1,
};

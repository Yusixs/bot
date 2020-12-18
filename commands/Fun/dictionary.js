const Discord = require('discord.js');
const urban = require('relevant-urban');

module.exports.run = async (bot, message, args) => {
	async function errorMsg(text) {
		const msg = await message.channel.send(text);
		msg.delete({ timeout: 5000 });
	}

	const string = args.join(' ');
	let result = '';

	try {
		result = await urban(string);
	}
	catch (e) {
		console.log(e);
		return errorMsg('Sorry, that word was not found');
	}

	// #region Embed
	const embed = new Discord.MessageEmbed()
		.setColor(0x1E2339)
		.setTitle(`Urban Dictionary: ${result.word}`)
		.setURL(result.urbanURL)
		.setThumbnail('https://cdn.discordapp.com/attachments/277517386800955393/631939101901324348/unknown.png')
		.setDescription(`
    \n**Definition**: ${result.definition}
    \n**Example**: \n${result.example}
    \n👍: **${result.thumbsUp}**
    \n👎: **${result.thumbsDown}**
    `)
		.setFooter(`Author: ${result.author}`);
	// #endregion

	message.channel.send(embed);
};

module.exports.help = {
	name: 'urban',
	aliases: ['dictionary'],
	description: 'Sends back a urban dictionary search result in a neat-looking way',
	guildOnly: false,
	args: true,
	usage: '<search term(s)>',
	cooldown: 5,
};

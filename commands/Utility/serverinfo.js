const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const verificationlvl = ['None', 'Low', 'Medium', 'High', 'Extra High'];
	const contentFilter = ['None', 'Scan Non-Role', 'Scan All'];
	const mfalvl = ['Off', 'On'];
	const server = message.guild;
	const time = new Date(server.createdTimestamp);
	const featuresList = server.features.map(f => f.toString());

	const general = `  
    \n**Members**: ${server.memberCount} (${server.members.filter(member => member.user.bot).size} bots)
    \n**Roles**: ${server.roles.size}
    \n**Emotes**: ${server.emojis.size}
    \n**Categories**: ${server.channels.filter(ch => ch.type === 'category').size}
    \n**Text Channels**: ${server.channels.filter(ch => ch.type === 'text').size}
    \n**Voice Channels**: ${server.channels.filter(ch => ch.type === 'voice').size}
    `.replace(/\n\s+/gm, '\n');

	const security = `  
    \n**Verification Level**: ${verificationlvl[server.verificationLevel]}
    \n**Content Filter Level**: ${contentFilter[server.explicitContentFilter]}
    \n**2FA**: ${mfalvl[server.mfaLevel]}
    `.replace(/\n\s+/gm, '\n');

	const details = `  
    \n**Owner**: ${server.owner.user.tag}
    \n**Region**: ${server.region}
    \n**Server Creation Date**: ${time.getDate()} ${months[time.getMonth()]}, ${time.getFullYear()}
    \n**Current Features**: ${featuresList}  
  `.replace(/\n\s+/gm, '\n');

	const emojiList = server.emojis.map(emote => emote.toString()).slice(0, 50).join(' ');
	const emojis = `**Emote List**: ${emojiList} **. . .**`;


	const embed = new Discord.MessageEmbed()
		.setColor(0x800080)
		.setAuthor(`${server.name}`, server.iconURL())
		.setThumbnail(server.iconURL())
		.addField('**General**', general, true)
		.addField('**Security**', security, true)
		.addField('**Details**', details, true)
		.addField(`**Emote List (${server.emojis.size})**`, emojis)
		.setFooter(`Server ID: ${server.id}`);


	message.channel.send(embed);
};

module.exports.help = {
	name: 'serverinfo',
	aliases: ['server', 'serverstat', 'serverstats'],
	description: 'Sends an embed containing information of a server',
	guildOnly: true,
	args: false,
	usage: '',
	cooldown: 5,
};
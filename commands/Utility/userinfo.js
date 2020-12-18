const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const guildMember = message.guild.member(message.mentions.users.first() || message.author);
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const joinDate = `${guildMember.joinedAt.getDate()} ${months[guildMember.joinedAt.getMonth()]}, ${guildMember.joinedAt.getFullYear()}`;
	const joinDiscord = `${guildMember.user.createdAt.getDate()} ${months[guildMember.user.createdAt.getMonth()]}, ${guildMember.user.createdAt.getFullYear()}`;
	const daysInServer = Math.round((guildMember.joinedAt - message.guild.createdAt) / (1000 * 60 * 60 * 24));
	const daysInDiscord = Math.round((Date.now() - guildMember.user.createdAt) / (1000 * 60 * 60 * 24));

	const embed = new Discord.MessageEmbed()
		.setColor(0x800080)
		.setAuthor(`${guildMember.user.tag}`, guildMember.user.avatarURL())
		.setThumbnail(guildMember.user.avatarURL())
		.setDescription(`
    \n**Nickname**: ${guildMember.displayName}
    \n**Server Join Date**: ${joinDate} (${daysInServer} days since server created)
    \n**Account Created Date**: ${joinDiscord} (${daysInDiscord} days old)
    \n**Color**: ${guildMember.displayHexColor || 'None'}
    \n**Status**: ${guildMember.presence.status}
    \n**Voice Channel**: ${guildMember.voiceChannel || 'None'}
    \n**Highest Role**: ${guildMember.roles.highest}
    \n**Roles [${guildMember.roles.size}]**: ${guildMember.roles.map(r => r.toString()).slice(0, 50).join(' ')} **. . .**
    `)
		.setFooter(`User ID: ${guildMember.user.id}`);

	message.channel.send(embed);
};

module.exports.help = {
	name: 'userinfo',
	aliases: ['user', 'userstat', 'userstats'],
	description: 'Sends your or a member\'s information in the same channel',
	guildOnly: true,
	args: false,
	usage: '',
	cooldown: 1,
};
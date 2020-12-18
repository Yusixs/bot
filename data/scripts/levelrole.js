module.exports = function levelrole(bot, message) {

	const validChannels = ['561542609919672344', '607618299441840141', '604764172411994123'];
	if (!validChannels.includes(message.channel.id)) return;
	const validUsers = ['159985870458322944', '175823751894532097'];
	if (!validUsers.includes(message.author.id)) return;

	if (message.content.match(/^.* level (\d+)!$/) === null) return;
	const [, number] = message.content.match(/^.* level (\d+)!$/);
	const channel = bot.channels.get('561542609919672344');

	async function assignrole(newRole, oldRole, image) {
		const member = message.mentions.members.first();
		member.roles.add(message.guild.roles.find(r => r.name.toLowerCase() === newRole));
		member.roles.remove(message.guild.roles.find(r => r.name.toLowerCase() === oldRole));
		channel.send(`Congratulations ${member} for reaching ${message.guild.roles.find(r => r.name.toLowerCase() === newRole)} rank!`, { files: [image] });
	}

	const roles = {
		'3': () => assignrole('shinnyusei', 'musoka', 'https://i.imgur.com/o1JseiR.png'),
		'15': () => assignrole('kouhai', 'shinnyusei', 'https://i.imgur.com/TyFQrR8.png'),
		'25': () => assignrole('senpai', 'kouhai', 'https://i.imgur.com/mXi1Dq0.png'),
		'30': () => assignrole('sensei', 'senpai', 'https://i.imgur.com/FVU26tZ.png'),
		'35': () => assignrole('kyoshi', 'sensei', 'https://i.imgur.com/99Ab1nw.png'),
		'40': () => assignrole('heishi', 'kyoshi', 'https://i.imgur.com/DAX7K67.png'),
		'45': () => assignrole('kishi', 'heishi', 'https://i.imgur.com/jbP9AzR.png'),
		'50': () => assignrole('fukataishou', 'kishi', 'https://i.imgur.com/LanPrjM.png'),
		'55': () => assignrole('taishou', 'fukataishou', 'https://i.imgur.com/d4ff6bo.png'),
		'60': () => assignrole('kizoku', 'taishou', 'https://i.imgur.com/opfUUsj.png'),
		'65': () => assignrole('ouji', 'kizoku', 'https://i.imgur.com/KHZV3gp.png'),
		'70': () => assignrole('yuusha', 'ouji', 'https://i.imgur.com/ptj3N6h.png'),
	};

	if (!roles[number]) return;
	roles[number]();

};

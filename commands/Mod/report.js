/* eslint-disable no-shadow */
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	// Channel Filter
	const validChannels = ['600937738660741120', '604764172411994123', '604763962952777739', '607618299441840141', '607617573953208380'];
	if (!validChannels.includes(message.channel.id)) return;


	// Information of the Mod who did the command
	const usersid = message.author.id;
	const reporterTag = message.author.tag;
	const reporterPfp = message.author.avatarURL();
	const name = args[0];

	// Global Variables declared for use in functions later on
	const reported = message.mentions.users.first();
	let cause;
	let event;
	let actionrep;
	let mutetime;
	let tmdtime;
	let color;
	let filter;
	let collected;
	let reaction;
	let duration;

	// Different descriptions bundled together
	const embedmsgs = [
		`You have created a report for the user ${args[0]}, please react appropriately based on the following cases:
  \n 📘 : Breaking a Rule
  \n 📕 : Blacklist Role
  \n 📗 : Met Conditions for Role
  \n 📙 : Level Up
  \n 🔖 : Temporary Leave
  `,
		`Which Rule has the user: ${args[0]} broken? Please react appropriately based on the following cases:
  \n :one: : Language
  \n :two: : User Profile Issues
  \n :three: : Advertisement
  \n :four: : Channel Misuse
  \n :five: : Spam    
  \n :six: : Mention Misuse
  \n :seven: : NSFW Content
  \n :eight: : Behaviour Issues
  \n :nine: : Sensitive Topics
  \n 🔟 : Voice Chat Misuse
  \n ⏸ : Discord ToS
  \n 🛑 : Network - Sniping Cards
  `,
		`You have entered blacklist menu for the user ${args[0]}, please react appropriately based on the following cases:
  \n ✅ : Add Blacklist Role
  \n ❎ : Remove Blacklist Role
  \n ⬆ : Increase Blacklist Time
  \n ⬇ : Decrease Blacklist Time
  `,
		`Which role did the user: ${args[0]} get? Please react appropriately based on the following cases:
  \n 🔶 : Chess Senshu
  \n 🔷 : Chess Heiken Senshu
  \n ♠ : Pokemon Trainer
  \n ♣ : Pokemon Elite
  \n ♥ : Pokemon Champion
  \n ♦ : Pokemon Master
  \n ❓ : Harem Lord
  \n ❗ : Harem King
  \n ⁉ : Harem Emperor
  \n 🃏 : Credit Master
  \n 🔰 : Tomato Lover
  \n 🔱 : Card Master
  \n ⚜ : Stars Lord
  \n 🗨 : Kakera Enthusiast
  \n 👁‍🗨 : Kakera Connoisseur
  \n 🎵 : DJ Role
  \n 🔝 : Top Role
  `,
		`You have entered level up menu for the user ${args[0]}, please react appropriately based on the following cases:
  \n 💵 : Shinnyusei
  \n 💴 : Kouhai
  \n 💶 : Senpai
  \n 💷 : Sensei
  \n 📕 : Kyoshi    
  \n 📗 : Heishi
  \n 📘 : Kishi
  \n 📙 : FukaTaishou
  \n 🔵 : Taishou
  \n 🔴 : Kizoku    
  \n ⚫ : Ouji
  \n ⚪ : Yuusha   
  `,
		`What was the action taken against the user ${args[0]}? Please react appropriately based on the following cases:
  \n 🔵 : Mute
  \n 🔴 : Ban    
  \n ⚫ : Kick
  \n ⚪ : Role Adjustment
  \n 🔶 : Nothing
  `,
		`For how long has the time increased/decreased for the user (if any) : ${args[0]}? Please type in the time:
  \n E.g 10h, 10 Hours, 0 Hours, -10 Hours
  `,
		`What is the TMD time for the user (if any) : ${args[0]}? Please type in the time:
  \n E.g 5h, 5 Hours, 0 Hours, -5 Hours
  `];

	// Main array used to create menu's
	const embed = new Discord.MessageEmbed()
		.setColor(0xFFFFFF)
		.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL());


	// #region Object (Used to determine which reaction corresponds to which situation E.g Rule 1)
	const rule = {
		'1⃣': 'Rule #1 - Language',
		'2⃣': 'Rule #2 - Profile',
		'3⃣': 'Rule #3 - Advertisement',
		'4⃣': 'Rule #4 - Channel Misuse',
		'5⃣': 'Rule #5 - Spam',
		'6⃣': 'Rule #6 - Mention Misuse',
		'7⃣': 'Rule #7 - NSFW',
		'8⃣': 'Rule #8 - Behaviour',
		'9⃣': 'Rule #9 - Sensitive Topics',
		'🔟': 'Rule #10 - Voice Chat Misuse',
		'⏸': 'Rule #11 - Discord ToS',
		'🛑': 'Rule #12 - Sniping Cards',
	};

	const blacklist = {
		'✅': 'Added Blacklist Role',
		'❎': 'Removed Blacklist Role',
		'⬆': 'Increased Blacklist Time',
		'⬇': 'Decreased Blacklist Time',
	};

	const condition = {
		'🔶': 'Added Chess Senshu role',
		'🔷': 'Added Chess Heiken Senshu role and removed previous Chess Senshu role',
		'♠': 'Added Pokemon Trainer role',
		'♣': 'Added Pokemon Elite role and removed previous Pokemon Trainer role',
		'♥': 'Added Pokemon Champion role and removed previous Pokemon Elite role',
		'♦': 'Added Pokemon Master role and removed previous Pokemon Champion role',
		'❓': 'Added Harem Lord role',
		'❗': 'Added Harem King role and removed previous Harem Lord role',
		'⁉': 'Added Harem Emperor role and removed previous Harem King role',
		'🃏': 'Added Credit Master role',
		'🔰': 'Added Tomato Lover role',
		'🔱': 'Added Card Master role and removed previous Tomato Lover role',
		'⚜': 'Added Stars Lord role and removed previous Card Master role',
		'🗨': 'Added Kakera Enthusiast role',
		'👁‍🗨': 'Added Kakera Connoisseur role and removed Kakera Enthusiast role',
		'🎵': 'Added DJ role',
		'🔝': 'Added Top role',
	};

	const level = {
		'💵': 'Leveled up to Shinnyuusei',
		'💴': 'Leveled up to Kouhai',
		'💶': 'Leveled up to Senpai',
		'💷': 'Leveled up to Sensei',
		'📕': 'Leveled up to Kyoshi',
		'📗': 'Leveled up to Heishi',
		'📘': 'Leveled up to Kishi',
		'📙': 'Leveled up to FukaTaishou',
		'🔵': 'Leveled up to Taishou',
		'🔴': 'Leveled up to Kizoku',
		'⚫': 'Leveled up to Ouji',
		'⚪': 'Leveled up to Yuusha',
	};

	const action = {
		'🔶': 'Nothing',
		'🔵': 'Muted',
		'🔴': 'Banned',
		'⚫': 'Kicked',
		'⚪': 'Role Adjustment',
	};
	// #endregion

	// Bulk React in specific order
	async function reactMultiple(message, reactions) {
		for (const r of reactions) {
			await message.react(r);
		}
	}

	// After all data is gathered, this function is used to create the final report
	async function finalReportEmbed(message) {
		message.delete();
		const finalEmbed = new Discord.MessageEmbed()
			.setColor(color)
			.setThumbnail(`${reported.avatarURL()}`)
			.setAuthor(`${reporterTag}`, reporterPfp)
			.setDescription(`**Member:** ${name}\n**Cause:** ${cause} (${event})\n**Action:** ${actionrep}\n**Duration:** ${mutetime}\n**Total Mute Duration:** ${tmdtime}`);
		bot.channels.get('600937738660741120').send(`👋 ${name} 👋 \n`);
		bot.channels.get('600937738660741120').send(finalEmbed);
		// message.channel.send(`👋 ${name} 👋 \n`);
		// message.channel.send(finalEmbed);
	}

	// Main function to create sub-reaction-input menus [Returns reaction user selected]
	async function reactionMenu(message, embedNum, reactions) {
		await message.reactions.removeAll();
		await message.edit(embed.setDescription(embedmsgs[embedNum]));
		await reactMultiple(message, reactions);
		filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === usersid;
		collected = await message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] });
		reaction = collected.first();
		return reaction;
	}

	// Main function to create sub-message-input menus [Returns message user inputted]
	async function messageMenu(message, embedNum) {
		await message.reactions.removeAll();
		await message.edit(embed.setDescription(embedmsgs[embedNum]));
		filter = collected => collected.author.id === usersid;
		collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
		duration = collected.first();
		await duration.delete();
		return duration;
	}

	// These are 3 Menus done in the switch statement
	async function actionMenu(message) {
		await reactionMenu(message, 5, ['🔵', '🔴', '⚫', '⚪', '🔶']);
		actionrep = action[reaction.emoji.name];
		await messageMenu(message, 6);
		mutetime = duration.content;
		await messageMenu(message, 7);
		tmdtime = duration.content;
		finalReportEmbed(message);
	}

	// Initializes Main report menu and makes the message be focussed onto the bot's embed instead of mod's command
	message.delete();
	message = await message.channel.send(embed.setDescription(embedmsgs[0]));
	await reactMultiple(message, ['📘', '📕', '📗', '📙', '🔖']);
	filter = (reaction, user) => ['📘', '📕', '📗', '📙', '🔖'].includes(reaction.emoji.name) && user.id === usersid;
	collected = await message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] });
	reaction = collected.first();

	// Switch between different sub-menu's according to case
	switch (reaction.emoji.name) {
	case '📘':
		cause = 'Breaking a Rule';
		color = 0x4169E1;
		await reactionMenu(message, 1, ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟', '⏸', '🛑']);
		event = rule[reaction.emoji.name];
		await actionMenu(message);
		break;
	case '📕':
		cause = 'Blacklist Role';
		color = 0xFF0000;
		await reactionMenu(message, 2, ['✅', '❎', '⬆', '⬇']);
		event = blacklist[reaction.emoji.name];
		await actionMenu(message);
		break;
	case '📗':
		cause = 'Met conditions for role';
		color = 0x88D969;
		await reactionMenu(message, 3, ['🔶', '🔷', '♠', '♣', '♥', '♦', '❓', '❗', '⁉', '🃏', '🔰', '🔱', '⚜', '🗨', '👁‍🗨', '🎵', '🔝']);
		event = condition[reaction.emoji.name];
		await actionMenu(message);
		break;
	case '📙':
		cause = 'Leveled up';
		color = 0xFFA500;
		await reactionMenu(message, 4, ['💵', '💴', '💶', '💷', '📕', '📗', '📘', '📙', '🔵', '🔴', '⚫', '⚪']);
		event = level[reaction.emoji.name];
		await actionMenu(message);
		break;
	case '🔖':
		cause = 'Temporary Leave';
		color = 0xBEBEBE;
		event = '👋';
		actionMenu(message);
		break;
	default:
		break;
	}
};

module.exports.help = {
	name: 'report',
	aliases: [],
	description: 'Generates a report for user!',
	guildOnly: true,
	args: true,
	usage: '<@member>',
	cooldown: 10,
};

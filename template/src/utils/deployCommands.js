require("dotenv").config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.TOKEN
const path = require('path')
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, '../interactions')).filter(file => file.endsWith('.js'));

// Place your client and guild id here
const clientId = '';
const guildId = '';

for (const file of commandFiles) {
	const command = require(path.join(__dirname, `../interactions/${file}`));
	commands.push(new command().data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
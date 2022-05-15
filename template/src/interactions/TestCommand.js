const SlashCommand = require('../utils/structures/SlashCommand');
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = class TestCommand extends SlashCommand {
  constructor() {
    super(new SlashCommandBuilder()
    .setName("test")
    .setDescription("Welcome to Makecord!"));
  }

  async run(client, interaction) {
    return interaction.reply("Testing from Makecord scaffolder!")
  }
}
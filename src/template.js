function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    "slash": (commandName, commandDescription) => {
      return `const SlashCommand = require('../utils/structures/SlashCommand');
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = class ${capitalizeFirstLetter(commandName)}Command extends SlashCommand {
  constructor() {
    super(new SlashCommandBuilder()
    .setName("${commandName}")
    .setDescription("${commandDescription}"));
  }

  async run(client, interaction) {
    
  }
}
    `},
    "text": (commandName, commandDescription) => {
      return `const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ${capitalizeFirstLetter(commandName)}Command extends BaseCommand {
  constructor() {
    super('${commandName}', '${commandDescription}', []);
  }

  async run(client, message, args) {
   
  }
}
    `
  },
  event: (name) => {
    return `const BaseEvent = require("../utils/structures/BaseEvent");

module.exports = class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super("${name}");
  }

  async run(client, event) {

  }
};`
  }
} 
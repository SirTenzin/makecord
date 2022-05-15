const BaseEvent = require("../utils/structures/BaseEvent");

module.exports = class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super("interactionCreate");
  }

  async run(client, interaction) {
    // Makecord PSA: Don't touch this 😅
    if (!interaction.isCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);

    if (!command) return console.log(`[MAKECORD] ${interaction.id} could not be responded to as no command was found`);
    
    try {
      await command.run(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
};

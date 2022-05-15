const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'Welcome to Makecord!', []);
  }

  async run(client, message, args) {
    return message.reply("Testing from Makecord scaffolder!")
  }
}
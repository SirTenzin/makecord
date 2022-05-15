# ✨ Makecord | An advanced Discord bot scaffolder.

<img src="https://i.ibb.co/4tMV0LV/cover.png">

<p align="center">
    <img style="display: block:" src="https://img.shields.io/npm/dm/makecord.svg">
    <img style="display: block:" src="https://hits.link/hits?url=https://github.com/SirTenzin/makecord">
</p>

Makecord is a rather advanced Discord bot project scaffolder to kickstart your project off its feet.
Note: It is not a Discord bot or provide any commands!

# 📥 Installation 

```
npm i -g makecord
```

# Usage 

To create a new project, run:

```
makecord new <project name>
```

To deploy your slash commands, run:

```diff
- You must fill in the clientId and guildId variables in src/utils/deployCommandsGlobally.js 
- and src/utils/deployCommands.js to use these scripts! 

+ Global
npm run deploy:global
+ Guild based commands
npm run deploy
```

To finally run your bot, run:

```diff
+ Development
npm run dev
+ Production
npm run start
```

Adding a command is simple, you can view the test commands for Slash Commands and Text Commands in the respective folders. Soon you will be able to add events and commands right from makecord.

# Contacts

Want a new feature or discuss a bug? DM me on Discord or Telegram:

![Discord](https://img.shields.io/badge/tenzin%238951-%237289DA.svg?logo=discord&logoColor=white)
![Telegram](https://img.shields.io/badge/SirTenzin-2CA5E0?logo=telegram&logoColor=white)

# To Do

- [ ] Add ability to create events and commands in makecord
- [ ] Add ability to run the bot in any enviroment from makecord
- [ ] Add more configuration options during project creation.
- [ ] Verbose mode
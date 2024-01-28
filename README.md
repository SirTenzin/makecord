# ✨ Makecord | An advanced Discord bot scaffolder. ![https://npm.im/makecord](https://img.shields.io/npm/dm/makecord.svg) ![https://github.com/SirTenzin/makecord](https://hits.link/hits?url=https://github.com/SirTenzin/makecord)

<img src="https://i.ibb.co/4tMV0LV/cover.png">

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

Adding a command or an event is simple, just use the create command and follow the prompts:

```diff
- Events
makecord create event
+ Command
makecord create command
```

# To Do

- [X] Add ability to create events and commands in makecord
- [ ] Add ability to run the bot in any enviroment from makecord
- [ ] Add more configuration options during project creation.
- [ ] Verbose mode

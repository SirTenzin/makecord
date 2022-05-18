#! /usr/bin/env node
const figlet    = require('figlet');
const pkg       = require('../package.json');
const nconf     = require("nconf");
const path      = require('path');
const program   = require('commander');
const Logger    = require('./Logger');
const inquirer  = require("inquirer");
const fs        = require('fs');
const { spawn }  = require("child_process")

program.version(pkg.version)

module.exports = class app {

    /**
     * 
     * @param {Array} args 
     */

    constructor(args) {
        this.args = args;
        this.configurate();
        
        // Save Configuration
        process.on("beforeExit", () => {
            this.config.save()
        })
    }

    async start() {
        this.loglogo();
        this.checks();
        Logger.info(`version ${pkg.version}`);
        this.loadCommands();

        program.parse(this.args);
    }
    
    loadCommands() {
        function copyFileSync(source, target) {
            var targetFile = target;
        
            // If target is a directory, a new file with the same name will be created
            if (fs.existsSync(target)) {
                if (fs.lstatSync(target).isDirectory()) {
                    targetFile = path.join(target, path.basename(source));
                }
            }
        
            fs.writeFileSync(targetFile, fs.readFileSync(source));
        }
        function copyFolderRecursiveSync(source, target) {
            
            var files = [];
        
            // Check if folder needs to be created or integrated
            var targetFolder = path.join(target, path.basename(source));
            if (!fs.existsSync(targetFolder)) {
                fs.mkdirSync(targetFolder);
            }
        
            // Copy
            if (fs.lstatSync(source).isDirectory()) {
                files = fs.readdirSync(source);
                files.forEach(function (file) {
                    var curSource = path.join(source, file);
                    if (fs.lstatSync(curSource).isDirectory()) {
                        copyFolderRecursiveSync(curSource, targetFolder);
                    } else {
                        copyFileSync(curSource, targetFolder);
                    }
                });
            }
        }
        program.command("new <name>")
        .description("create a new makecord project")
        .option("name", "the name of the project")
        .action(async(name, args) => {
            if(!name) return Logger.error("please specify a name for this project")
            else {
                // Initiate variables
                var prefix, token
                inquirer.prompt([
                    {
                        "name": "prefix",
                        "type": "input",
                        "message": "what is your discord bot's prefix"
                    }, {
                        "name": "token",
                        "type": "input",
                        "message": "what is your discord bot's token",
                    }
                ]).then(async a => {
                    prefix = a.prefix
                    token = a.token
                    fs.mkdir(path.join(process.cwd(), `${name}`), () => {
                        Logger.info("created a new directory")
                        copyFolderRecursiveSync(path.join(__dirname, "../template/src"), path.join(`${name}`))
                        copyFileSync(path.join(__dirname, "../template/.env"), path.join(process.cwd(), `${name}/.env`))
                        copyFileSync(path.join(__dirname, "../template/.makecord"), path.join(process.cwd(), `${name}/.makecord`))
                        copyFileSync(path.join(__dirname, "../template/npm-init.bat"), path.join(process.cwd(), `${name}/npm-init.bat`))
                        copyFileSync(path.join(__dirname, "../template/package.json"), path.join(process.cwd(), `${name}/package.json`))
                        copyFileSync(path.join(__dirname, "../template/config.js"), path.join(process.cwd(), `${name}/config.js`))
                        fs.writeFile(path.join(process.cwd(), `${name}/.env`), `TOKEN=${token}\nPREFIX=${prefix}`, (err) => {
                            if(err) return Logger.err("an error has occured while writing your environment variables")
                            else return Logger.success(".env done!")
                        })
                        fs.writeFile(path.join(process.cwd(), `${name}/.makecord`), `Name=${name}\nVersion=${pkg.version}`, err => {
                            if(err) return Logger.err("an error has occured while writing your makecord configuration file")
                            else {
                                Logger.success(".makecord done!")
                                var cp = spawn(`cmd.exe`, [`/c`, `cd ./${name} && npm-init.bat`])
                                cp.stdout.pipe(process.stdout)
                                cp.stderr.pipe(process.stderr)
                            }
                        })

                    })
                })
            }
        })

        program.command("create <type>")
        .description("create a new command or event")
        .option("type", "'event' or 'command'")
        .action(async type => {
            if(type == "command") {
                var isMakecordProject = fs.existsSync(path.join(process.cwd(), "/.makecord"))
                if(!isMakecordProject) return Logger.error("this is not a makecord project!")
                else {
                    inquirer.prompt([
                        {
                            "message": "what is the command's name",
                            "type": "input",
                            "name": "commandName",
                            validate: (x) => { return !(!x) }
                        }, {
                            "message": "what is the command's description",
                            "type": "input",
                            "name": "commandDescription",
                            validate: (x) => { return !(!x) }
                        }, {
                            "name": "type",
                            "message": "what is the command's type (slash or text)",
                            "type": "list",
                            "choices": [
                                "slash",
                                "text"
                            ]
                        }
                    ]).then(async (answers) => {
                        if(answers.type == "text") {
                            inquirer.prompt([
                                {
                                    "message": "what is the command's category",
                                    "type": "input",
                                    "name": "category",
                                    validate: (x) => { return !(!x) }
                                }
                            ]).then(async a2 => {
                                if(a2.category) {
                                    var catexists = fs.existsSync(path.join(process.cwd(), `src/commands/${a2.category}`))
                                    if(catexists) {
                                        var text = require("./template")[answers.type](answers.commandName, answers.commandDescription)
                                        fs.writeFile(path.join(process.cwd(), `src/commands/${a2.category}/${this.capitalizeFirstLetter(answers.commandName)}Command.js`), text, (err) => {
                                            if(err) return Logger.error(err.message)
                                            else return Logger.success("done!")
                                        })
                                    } else return Logger.error("that is an invalid category, please create the directory first")
                                } else return Logger.error("that is an invalid category")
                            })
                        } else {
                            var text = require("./template.js")[answers.type](answers.commandName, answers.commandDescription)
                            fs.writeFile(path.join(process.cwd(), `src/interactions/${this.capitalizeFirstLetter(answers.commandName)}Command.js`), text, (err) => {
                                if(err) return Logger.error(err.message)
                                else return Logger.success("done!")
                            })
                        }
                    })
                }
            } else if (type == "event") {
                return Logger.info("coming soon")
            } else if (type == "project") {
                return Logger.warn("please use `makecord new` instead")
            } else return Logger.error("`type` must be 'command', 'event' or 'project'")
            
        })
    }

    checks() {
        if(this.config.get("version") == pkg.config.beta) {
            Logger.warn("detected beta config this might result in")
            Logger.warn("unexpected errors and results using makecord.")
        } else if(this.config.get("version") != pkg.config.stable) {
            Logger.warn("detected unstable config this might result in")
            Logger.warn("unexpected errors and results using makecord.")
        } else {
            Logger.info("detected and loaded stable config")
        }
    }

    async configurate() {
        nconf.file({ file: path.join(__dirname, '../.makecord/config.json') });
        this.config = nconf

        nconf.defaults({
            "version": pkg.config.stable,
            "settings": {}
        })
    }

    loglogo() {
        if(typeof this.config.get("settings") !== 'undefined') {

            if(typeof this.config.get("settings:noLogLogo") !== 'undefined') {
                return console.log("makecord")
            } 
            if(this.config.get("settings:color") !== 'undefined') {
                switch(this.config.get("settings:color")) {
                    case "red": {           
                        console.log(figlet.textSync("makecord", "Big Money-ne").red);
                    } break;
                    case "green": {
                        console.log(figlet.textSync("makecord", "Big Money-ne").green);
                    } break;
                    case "yellow": {
                        console.log(figlet.textSync("makecord", "Big Money-ne").yellow);
                    } break; 
                    case "blue": {
                        console.log(figlet.textSync("makecord", "Big Money-ne").blue);
                    } break;
                    default: {
                        console.log(figlet.textSync("makecord", "Big Money-ne"));
                    } break;
                }
            } else {
                console.log(figlet.textSync("makecord", "Big Money-ne"));
            }
        }


    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
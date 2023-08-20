require('dotenv').config();

const {token} = process.env;
const {Client, Collection, GatewayIntentBits} = require('discord.js');
const fs = require('fs')
const {updateData, getData} = require("./misc/dataManager");

const client = new Client({intents: GatewayIntentBits.Guilds});
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionsFiles = fs.readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionsFiles)
        require(`./functions/${folder}/${file}`)(client);
}

/*
 *
 * Update if Date is changed.
 *
 */
const lettersArray = ["A", "C", "D", "E", "F", "G", "H"]


try {
    const filePath = "res/versionNum.txt"
    fs.accessSync(filePath, fs.constants.F_OK);
    // Checking if Number on the Spreadsheet matches local one
    fs.readFile(filePath, 'utf8', (err, localData) => {
        if (err) {
            console.error(err);
            return;
        }

        getData("Weights", "A")
            .then(data => parseInt(data))
            .then(intValue => {
                if (parseInt(localData.match(/\d+/)[0]) !== intValue) {
                    for (let i = 0; i < lettersArray.length; i++) {
                        //update all
                        updateData("Weights", lettersArray[i]).catch(error => console.error("Data couldn't be updated:" + error))
                    }
                }
            })
    });
}catch (error) {
    console.log("No versionNum.txt found. Updating all.")
    for (let i = 0; i < lettersArray.length; i++) {
        //update all
        updateData("Weights", lettersArray[i]).catch(error => console.error("Data couldn't be updated:" + error))
    }
}


client.handleEvents();
client.handleCommands();
client.login(token);
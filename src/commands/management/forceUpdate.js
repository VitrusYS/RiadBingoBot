const { SlashCommandBuilder } = require('discord.js');
const {adminId, devRoleId, logChannelId} = process.env
const {updateData} = require("../../misc/updateDataHelper");
const {createLogString, logToConsole} = require("../../misc/log");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forceupdate')
        .setDescription('Updates data from the spreadsheet.'),
    async execute(interaction, client) {
        const date = interaction.createdAt
        if (interaction.user.id === adminId || interaction.member.roles.cache.find(r => r.id === devRoleId)) {

            const lettersArray = ["A", "C", "D", "E", "F", "G", "H"]

            for (let i = 0; i < lettersArray.length; i++) {
                updateData("Weights", lettersArray[i]).catch(error => console.error("Data couldn't be updated:" + error))
            }

            //Log to channel
            await client.channels.cache.get(logChannelId).send(createLogString(date,`${interaction.user.username} updated spreadsheet data.`))

            await interaction.reply({
                ephemeral: true,
                content: "Done!"
            });
        } else {
            const newMessage = `You have no permission to use that Command.`

            logToConsole(date, `${interaction.user.username} tried to update the data, had no permission.`)
            await interaction.reply({
                content: newMessage,
                ephemeral: true
            });
        }
    }
}



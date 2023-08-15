const {SlashCommandBuilder} = require('discord.js');
const {adminId, devRoleId} = process.env
const {logToConsole} = require('../../misc/log.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shutdowns bot (if permitted).'),
    async execute(interaction, client) {

        /*
        * Bot can only be restarted by people with the specified adminId or devRole defined in the .env
        */
        if (interaction.user.id === adminId || interaction.member.roles.cache.find(r => r.id === devRoleId)) {
            const newMessage = 'Shutting down...';

            await interaction.reply({
                content: newMessage
            });

            logToConsole(interaction.createdAt, `${interaction.user.username} stopped the bot`)
            client.destroy();

        } else {
            const newMessage = `You have no permission to use that Command.`

            logToConsole(interaction.createdAt, `${interaction.user.username} tried to stop the bot, had no permission.`)
            await interaction.reply({
                content: newMessage,
                ephemeral: true
            });
        }
    }
}

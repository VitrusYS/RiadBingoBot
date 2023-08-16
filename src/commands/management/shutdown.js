const {SlashCommandBuilder} = require('discord.js');
const {adminId, devRoleId, logChannelId} = process.env
const {logToConsole, createLogString} = require('../../misc/log.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shutdowns bot (if permitted).'),
    async execute(interaction, client) {
        const date = interaction.createdAt
        /*
        * Bot can only be restarted by people with the specified adminId or devRole defined in the .env
        */
        if (interaction.user.id === adminId || interaction.member.roles.cache.find(r => r.id === devRoleId)) {

            const newMessage = 'Shutting down...';

            await interaction.reply({
                ephemeral: true,
                content: newMessage
            });

            logToConsole(date, `${interaction.user.username} stopped the bot`)
            await client.channels.cache.get(logChannelId).send(createLogString(date `${interaction.user.username} stopped the bot`))
            client.destroy();

        } else {
            const newMessage = `You have no permission to use that Command.`

            logToConsole(date, `${interaction.user.username} tried to stop the bot, had no permission.`)
            await interaction.reply({
                content: newMessage,
                ephemeral: true
            });
        }
    }
}

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echos your message back.')
        .addStringOption(option =>
            option
                .setName('echomessage')
                .setDescription('message')
                .setRequired(true))
        .addBooleanOption( option =>
        option
            .setName('isrude')
            .setDescription('Should the message be rude?')),

    async execute(interaction, client) {
        var newMessage = `${interaction.options.getString('echomessage')}`
        if (interaction.options.getBoolean('isrude')){
            var res = ""
            for (i=0; i < newMessage.length; i++) {
                res += i % 2 == 0 ? newMessage.charAt(i).toUpperCase() : newMessage.charAt(i).toLowerCase();
            }
            newMessage = res + ' ... bitch.';
        }
        await interaction.reply({
            content: newMessage
        });
    }
}

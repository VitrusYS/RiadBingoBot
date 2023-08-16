const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('makebingo')
        .setDescription('Returns an embed of a Bingo.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Bingo Card for ${interaction.user.username}`)
            .setDescription("TestDescription")
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://www.youtube.com`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.username,
            })
            .addFields([
                {
                    name: `testfieldname1`,
                    value: `testfieldvalue1`,
                    inline: true
                },
                {
                    name: `testfieldname2`,
                    value: `testfieldvalue2`,
                    inline: true
                },
                {
                    name: `testfieldname3`,
                    value: `testfieldvalue3`,
                    inline: false
                }
            ]);

        await interaction.reply({
            embeds: [embed]
        });
    }
}

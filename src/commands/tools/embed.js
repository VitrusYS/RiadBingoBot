const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Returns an embed.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Testembed")
            .setDescription("TestDescription")
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://github.com/VitrusYS/PokemonBot`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag,
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setURL('https://github.com/VitrusYS/PokemonBot#readme')
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

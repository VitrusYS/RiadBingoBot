const { SlashCommandBuilder } = require('discord.js');
const {shuffleArray, getJson} = require("../../misc/dataManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generateprompts')
        .setDescription('Generates a list of Prompts')
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Type of Sheet that should be generated')
                .setRequired(true)
                .setChoices(
                    {name: 'PC', value: 'pcOnly'},
                    {name: 'Quest', value: 'questOnly'},
                    {name: 'Poicast', value: 'poicast'},
                    {name: 'General', value: 'general'},
                    {name: 'Gameday', value: 'gamedayOnly'},
                    )),

    async execute(interaction) {
        const type = interaction.options.getString('type')

        let data = getJson('res/general.json')
        let newData = data
        if (type !== 'general') {
            const tempData = getJson('res/'+type+'.json')
            newData = data.concat(tempData)
        }
        if (type === 'poicast') {
            newData = await getJson('res/'+type+'.json')
        }

        const shuffledData= shuffleArray(newData);
        const output = shuffledData.slice(0, 25);
        const dataArray = Array.from(output);

        const message = dataArray.join('\n')

        await interaction.reply({
            content: message
        });
    }
}
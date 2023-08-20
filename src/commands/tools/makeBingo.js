const {ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder} = require('discord.js');
const {getJson, shuffleArray} = require("../../misc/dataManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bingoboard')
        .setDescription('Generates a Bingoboard for the given type')
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
        //TODO optimize
        let newData = data
        if (type !== 'general') {
            const tempData = getJson('res/' + type + '.json')
            newData = data.concat(tempData)
        }
        if (type === 'poicast') {
            newData = await getJson('res/' + type + '.json')
        }
        //JSON.stringify()
        const shuffledData = shuffleArray(newData);
        const output = shuffledData.slice(0, 25);
        const dataArray = Array.from(output).map(obj => JSON.stringify(obj))


        for (let i = 0; i < dataArray.length; i++) {
            console.log(i + " " + typeof dataArray[i] + ":  " + dataArray[i])
        }

        //oh god lets populate the cells

        const buttons = [];
        const rows = [];

        for (let i = 0; i < dataArray.length; i++) {
            const rowNumber = Math.floor(i / 5) + 1;
            const columnNumber = i % 5 + 1;

            //String.fromCharCode(64 ...) -> letters a-e
            const button = new ButtonBuilder()
                .setCustomId(String.fromCharCode(64 + rowNumber) + columnNumber)
                .setStyle(ButtonStyle.Primary)
                .setLabel(String.fromCharCode(64 + rowNumber) + columnNumber);

            buttons.push(button);

            if (columnNumber === 1) {
                const row = new ActionRowBuilder();
                rows.push(row);
            }

            rows[rowNumber - 1].addComponents(button);
        }

        const response = await interaction.reply({
            content: "imagine a Bingo board here\n" +
                "yep its hard ik but just imagine for now",
            components: [rows[0], rows[1], rows[2], rows[3], rows[4]],
        });

        /**
         *
         *
         * TODO: This is just a WIP for now, Im too lazy to include that rn.
         *
         *
         const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

         collector.on('collect', async i => {
            const selection = i.values[0];
            await i.reply(`${i.user.username} has selected ${selection}!`);
        });


         //const collectorFilter = i => i.user.id === interaction.user.id;
         try {
            //const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 })
            const confirmation = await response.awaitMessageComponent({time: 60_000 })

            if (confirmation.customId === 'register') {
                //await confirmation.update({ content: `${interaction.user.username} has been registered`, components: [] })
                await ({
                    ephemeral: true,
                    content: "You have been registered.",
                })

                console.log(`${interaction.user.username} has been registered.`)
            } else if (confirmation.customId === 'cancel') {
                console.log(`${interaction.user.username} has canceled.`)
                //await confirmation.update({ content: 'Action cancelled', components: [row2] })
            }
        } catch (e) {
            console.log(e)
            await interaction.reply({
                content: 'Confirmation not received within 1 minute, cancelling',
                components: []
            })
        }
         */
    }
}



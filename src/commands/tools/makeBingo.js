const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('makebingo')
        .setDescription('Returns an embed of a Bingo.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder().from()
            .setTitle('Bingo Game')
            .setDescription('A new bingo game has started! Get your cards ready!')
            .setColor('#0048ff')
            .setTimestamp()

        const array = [
            ['string1', 'string2', 'string3', 'string4', 'string5'],
            ['string6', 'string7', 'string8', 'string9', 'string10'],
            ['string11', 'string12', 'string13', 'string14', 'string15'],
            ['string16', 'string17', 'string18', 'string19', 'string20'],
            ['string21', 'string22', 'string23', 'string24', 'string25']
        ];

        array.forEach((row, rowIndex) => {
            row.forEach((string, colIndex) => {
                embed.addFields(`Cell ${rowIndex + 1}-${colIndex + 1}`, string, true);
            });
        });

       await interaction.channel.send(embed);
    }
}

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random Bingo field
function generateBingoField() {
    const fieldSize = 5;
    const minNumber = 1;
    const maxNumber = 75;
    const field = [];

    // Generate unique random numbers for each cell
    const numbers = new Set();
    while (numbers.size < fieldSize * fieldSize - 1) {
        numbers.add(getRandomNumber(minNumber, maxNumber));
    }

    // Create the Bingo field array
    for (let i = 0; i < fieldSize; i++) {
        const row = [];
        for (let j = 0; j < fieldSize; j++) {
            if (i === Math.floor(fieldSize / 2) && j === Math.floor(fieldSize / 2)) {
                // Add "FREE" space in the center
                row.push('FREE');
            } else {
                // Add a random number
                row.push(getRandomNumber(minNumber, maxNumber));
            }
        }
        field.push(row);
    }

    return field;
}
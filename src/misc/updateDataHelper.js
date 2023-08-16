const {google} = require('googleapis')
const fs = require('fs');
const {spreadsheetId} = process.env;

const rangeTemplate = "#!~:~"

module.exports = {

    updateData: async function (tableName, rowLetter) {

        let range = rangeTemplate.replace(/~/g, rowLetter)
        range = range.replace(/#/g, tableName)

        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        })

        //Create Client
        const client = auth.getClient()

        //Instance Google API
        const googleSheets = google.sheets({
            version: "v4",
            auth: client
        })

        //Read Rows
        const getGeneral = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: range
        })

        let jsonString = JSON.stringify(getGeneral.data.values, null, 4);

        let name
        switch (rowLetter) {
            case "A":
                name = "versionNum.txt"
                jsonString = JSON.stringify(getGeneral.data.values[1])
                break;
            case "C":
                name = "general.json"
                break;
            case "D":
                name = "pcOnly.json"
                break;
            case "E":
                name = "questOnly.json"
                break;
            case "F":
                name = "optionals.json"
                break;
            case "G":
                name = "poicast.json"
                break;
            case "H":
                name = "gameday.json"
                break;
            default:
                console.log("Update defaulted to: " + rowLetter)
                name = "data.json"
        }

        const filePath = `res/${name}`;


        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error('Error writing ' + filePath + ' file:', err);
            } else {
                console.log(filePath + ' has been saved!');
            }
        });
    },

    getData: async function (tableName, rowLetter) {

        let range = rangeTemplate.replace(/~/g, rowLetter)
        range = range.replace(/#/g, tableName)

        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        })

        //Create Client
        const client = auth.getClient()

        //Instance Google API
        const googleSheets = google.sheets({
            version: "v4",
            auth: client
        })

        //Read Rows
        const getGeneral = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: range
        })

        return getGeneral.data.values[1];
    }
}
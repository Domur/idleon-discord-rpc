import { Client } from 'discord-rpc';

// TODO: Fill in with rest of classes/subclasses by their defined index
const classDefinitions = ["", "", "", "", "", "", "", "", "Barbarian"]

export function init() {
    const client = new Client({
        transport: 'ipc'
    });

    client.login({
        clientId: '612393453892141066', // put the client id from the dev portal here
        clientSecret: '2774666c72370931c82a8cfd8ac412f4360fd34de32f128b8e115da22c71524e' // put the client secret from the dev portal here
    });
    return client;
}

export function setActivity(client, rawData) {
    let charData = processData(rawData);
    client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: "Level " + charData.Lvl + " Barbarian " + "(" + charData.CurExp + "/" + charData.ReqExp + ")",
            state: "Fighting " + charData.Target + "s",
            timestamps: {
                start: Date.now()
            }
        }
    });
}

function processData(rawData) {
    if (rawData.CurExp > 1000000) {
        rawData.CurExp = Math.ceil((rawData.CurExp / 1000000) * 100) / 100 + "M"
    } else if (rawData.CurExp > 1000) {
        rawData.CurExp = Math.ceil((rawData.CurExp / 1000) * 100) / 100 + "K"
    }

    if (rawData.ReqExp > 1000000) {
        rawData.ReqExp = Math.ceil((rawData.ReqExp / 1000000) * 100) / 100 + "M"
    } else if (rawData.ReqExp > 1000) {
        rawData.ReqExp = Math.ceil((rawData.ReqExp / 1000) * 100) / 100 + "K"
    }

    rawData.Class = classDefinitions[rawData.Class];

    return rawData;
}
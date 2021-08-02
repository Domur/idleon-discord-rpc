
import { Client } from 'discord-rpc';
import { WebSocketServer } from 'ws';

const client = new Client({
    transport: 'ipc'
});


function setActivity(charData) {
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

client.login({
    clientId: '612393453892141066', // put the client id from the dev portal here
    clientSecret: '2774666c72370931c82a8cfd8ac412f4360fd34de32f128b8e115da22c71524e' // put the client secret from the dev portal here
});

const wss = new WebSocketServer({ port: 8080 });

const classDefinitions = ["", "", "", "", "", "", "", "", "Barbarian"]

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

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const jsonObj = processData(JSON.parse(data))
    setActivity(jsonObj)
  });
});
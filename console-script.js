var ws = new WebSocket("ws://localhost:8080");

function sendStatus(){
        let charName = D;
        let charNum = w.indexOf(charName);

        // breaks temporarily after player switches chars and the game is waiting for the db to update
        let data = {}
        data.CurExp = me["Exp0_" + charNum][0];
        data.ReqExp = me["ExpReq0_" + charNum][0];
        data.Lvl = me["Lv0_" + charNum][0];
        data.Class = me["CharacterClass_" + charNum];
        data.Target = me["AFKtarget_" + charNum];
        ws.send(JSON.stringify(data))
}

setInterval(function(){
    sendStatus()
}, 30000)

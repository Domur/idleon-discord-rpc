var ws = new WebSocket("ws://localhost:8080");
function setStatus(){
        let data = {}
        data.CurExp = Ze.Exp0_0[0];
        data.ReqExp = Ze.ExpReq0_0[0];
        data.Lvl = Ze.Lv0_0[0];
        data.Class = Ze.CharacterClass_0;
        data.Target = Ze.AFKtarget_0;
        ws.send(JSON.stringify(data))
}

setInterval(function(){
    setStatus()
}, 30000)

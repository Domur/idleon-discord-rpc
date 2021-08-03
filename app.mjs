import { WebSocketServer } from 'ws';
import { init, setActivity } from './discord-rpc.mjs'

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  const client = init();
  ws.on('message', function incoming(data) {
    setActivity(client, JSON.parse(data))
  });
});
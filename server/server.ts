import express from "express";
import ws from "ws";
import * as http from "http";

import { extractFiles } from "./fileSystem/reader"

const start: (port: number) => void = (port: number) => {
    const app: express.Express = express();

    app.use('/app', express.static('public/client-dist'))
    app.use('/files', express.static('public/files'))

    app.get("/api/", (_, res) => {
        res.send("Hello World!")
    })
    app.get("/api/files", (_, res) => {
        extractFiles("public/files")
            .then((files) => res.json(files))
            .catch((error) => res.json(error))
    })

    const server: http.Server = app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })

    const wsServer = new ws.Server({ noServer: true });
    wsServer.on('connection', (socket: ws) => {
        socket.on('message', (message: ws.Data) => console.log(message));
    });

    server.on("upgrade", (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, (s) => {
            setTimeout(() => {
                s.send(JSON.stringify({ "message": "hi from the server!" }))
            }, 1000)
            wsServer.emit('connection', s, request)
        })
    })
}

const server: { start: (port: number) => void } = { start };

export { server }

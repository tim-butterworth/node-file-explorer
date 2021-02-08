import { Action } from "redux";

type ActionReciever = {
    dispatch: (action: Action) => void;
}

type ActionEmitter = {
    stop: () => void
}

type Provider<O, ARGS> = (args: ARGS) => O;

const serverSocketProvider: Provider<ActionEmitter, { actionReciever: ActionReciever }> = ({ actionReciever }) => {
    const websocket = new WebSocket("ws://localhost:9090");
    websocket.onerror = (event: Event) => {
        console.log("Error received!")
        console.log(event.type)

        actionReciever.dispatch({ type: "ERROR" })
    }
    websocket.onmessage = (event: MessageEvent) => {
        console.log("Message received!")
        console.log(event.type)

        actionReciever.dispatch({ type: "MESSAGE" })
    }
    websocket.onopen = () => {
        console.log("The websocket is now open!")
        websocket.send(JSON.stringify({ "key": "value" }))
    }

    const stop = () => websocket.close()
    return {
        stop
    }
}

export {
    serverSocketProvider,
}

export type {
    ActionEmitter,
    ActionReciever
}
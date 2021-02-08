import * as React from "react";
import { Action } from "redux";

import { serverSocketProvider } from "./serverActionSource/serverSocketClient"

const connectSocket = () => serverSocketProvider({ actionReciever: { dispatch: (a: Action) => { console.log(a) } } })
const disconnectSocket = () => { console.log("Should disconnect the socket...") }

const App: React.FC<{}> = (): React.ReactElement => (
    <div>
        <div>
            Hi
        </div>
        <div>
            <button
                onClick={connectSocket}
            >
                connect socket
                </button>
        </div>
        <div>
            <button
                onClick={disconnectSocket}
            >
                disconnect socket
                </button>
        </div>
    </div>
)

export {
    App
}
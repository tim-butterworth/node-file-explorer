import { Action } from "redux";
declare type ActionReciever = {
    dispatch: (action: Action) => void;
};
declare type ActionEmitter = {
    stop: () => void;
};
declare type Provider<O, ARGS> = (args: ARGS) => O;
declare const serverSocketProvider: Provider<ActionEmitter, {
    actionReciever: ActionReciever;
}>;
export { serverSocketProvider, };
export type { ActionEmitter, ActionReciever };

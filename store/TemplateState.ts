import { atom, selector, selectorFamily } from "recoil";

export enum InputEntryMode { SIMPLE, LIST }
export type InputEntry = {
    type: InputEntryMode
    edit: boolean
    delete: boolean
    value: string
}

export const InputEntriesState = atom<InputEntry[]>({
    key: "input-entries",
    default: []
})
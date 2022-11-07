import { atom, selector } from "recoil";

export enum ControlViewStateEnum { TEMPLATE, BOTH, RESULT }
export const ControlViewState = atom<ControlViewStateEnum>({
    key: "control-view-state",
    default: ControlViewStateEnum.BOTH
})

export type ControlViewModeType = {
    mode: number
    template: string
    result: string
}

export const ControlViewMode = selector<ControlViewModeType>({
    key: "control-view-selector",
    get: ({get}): ControlViewModeType => {
        const controlViewState = get(ControlViewState)
        switch(controlViewState) {
            case ControlViewStateEnum.TEMPLATE: {
                return {
                    mode: 0,
                    template: "100%",
                    result: "0%"
                }
            }
            case ControlViewStateEnum.BOTH: {
                return {
                    mode: 1,
                    template: "50%",
                    result: "50%"
                }
            }
            case ControlViewStateEnum.RESULT: {
                return {
                    mode: 2,
                    template: "0%",
                    result: "100%"
                }
            }
        }
    }
})
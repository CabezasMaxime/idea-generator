import { Button, ButtonGroup, useMediaQuery } from "@chakra-ui/react"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { ControlViewMode, ControlViewState, ControlViewStateEnum } from "../../store/ControlViewState"

const ControlView = () => {
    const controlViewMode = useRecoilValue(ControlViewMode)
    const _setMode = useSetRecoilState(ControlViewState)
    const [isMobile] = useMediaQuery("(max-width: 48em)")

    useEffect(() => {
        setMode(isMobile ? ControlViewStateEnum.TEMPLATE : ControlViewStateEnum.BOTH)
    }, [isMobile])

    const setMode = (param: ControlViewStateEnum) => {
        window.scrollTo({
            top: 0
        })
        _setMode(param)
    }

    return (
        <ButtonGroup size="sm" isAttached variant="outline">
            <Button boxShadow="none" colorScheme="blue" onClick={() => setMode(ControlViewStateEnum.TEMPLATE)} isActive={controlViewMode.mode === 0}>Template</Button>
            <Button boxShadow="none" colorScheme="blue" display={isMobile?"none":"block"} onClick={() => setMode(ControlViewStateEnum.BOTH)} isActive={controlViewMode.mode === 1}>Both</Button>
            <Button boxShadow="none" colorScheme="blue" onClick={() => setMode(ControlViewStateEnum.RESULT)} isActive={controlViewMode.mode === 2}>Result</Button>
        </ButtonGroup>
    )
}

export default ControlView
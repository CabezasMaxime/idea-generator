import { Box, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { InputEntriesState, InputEntryMode } from "../../store/TemplateState"
import InputBlock from "../components/InputBlock"

const ControlButtons = ({index, isInsert=true}: {index: number, isInsert?: boolean}) => {
    const [inputEntries, setInputEntries] = useRecoilState(InputEntriesState)

    const addEntry = (type: InputEntryMode) => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries.splice(index, 0, {type, value: "", edit: false, delete: false})
        setInputEntries(mutatedInputEntries)
    }

    return (
        <ButtonGroup position="relative" w="100%" alignItems="center" mb="1.7rem">
            <Box w="100%" h="1px" bg="grey" opacity="0.3"></Box>
            <Button w="auto" minW="110px" h="30px" p="0.2rem" colorScheme="teal" color="white" onClick={() => addEntry(InputEntryMode.SIMPLE)}>{isInsert ? "Insert Simple" : "Add Simple"}</Button>
            <Button w="auto" minW="110px" h="30px" p="0.2rem 0" colorScheme="teal" color="white" onClick={() => addEntry(InputEntryMode.LIST)}>{isInsert ? "Insert List" : "Add List"}</Button>
            <Box w="100%" h="1px" bg="grey" opacity="0.3"></Box>
        </ButtonGroup>
    )
}

const TemplateView = () => {
    const inputEntries = useRecoilValue(InputEntriesState)

    return (
        <Box>
            <Heading as="h2" fontSize="25px" textAlign="center">Template</Heading>
            <hr />
            <Box display="flex" flexDirection="column" alignItems="center" mt="2rem">
                {inputEntries.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <InputBlock data={data} index={index} />
                            <br />
                            { index != inputEntries.length-1 && <ControlButtons index={index+1} /> }
                        </React.Fragment>
                    )
                })}
                <ControlButtons index={inputEntries.length} isInsert={false} />
            </Box>
        </Box>
    )
}

export default TemplateView

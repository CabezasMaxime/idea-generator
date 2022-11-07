import { Box, Button, Heading, Text } from "@chakra-ui/react"
import React, { ReactNode, useState } from "react"
import { useRecoilValue } from "recoil"
import { InputEntriesState, InputEntryMode } from "../../store/TemplateState"

const ResultView = () => {
    const [result, setResult] = useState<ReactNode[]>([])

    const inputEntries = useRecoilValue(InputEntriesState)

    const generate = () => {
        let _result: ReactNode[] = []
        inputEntries.forEach((el) => {
            if(el.type == InputEntryMode.SIMPLE) {
                _result.push(<span>{`${el.value}`}&nbsp;</span>)
            } else if(el.type == InputEntryMode.LIST) {
                let listOfWords = el.value.split(";").map((x) => { return x.trim() }).filter((y) => y != "")
                let rng = Math.floor(Math.random() * listOfWords.length)
                _result.push(<span style={{color: "orange", fontWeight: "bold"}}>{`${listOfWords[rng]}`}&nbsp;</span>)
            }
        })
        setResult(_result)
    }

    return (
        <Box>
            <Heading as="h2" fontSize="25px" textAlign="center">Result</Heading>
            <hr />
            <Box textAlign="center">
                <Box m="auto" mt="2rem" p="5rem" border="solid 1px black">
                    {
                        result.length > 0
                        ?
                        <i>{result.map((el, i) => {return <React.Fragment key={`result-${i}`}>{el}</React.Fragment>})}</i>
                        : <Text fontWeight="bold"><i>"Your Dream come true !"</i></Text>
                    }
                </Box>
                <Button mt="1rem" colorScheme="teal" onClick={() => generate()}>GENERATE</Button>
            </Box>
        </Box>
    )
}

export default ResultView
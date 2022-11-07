import { useState } from "react"
import { useRecoilState } from "recoil"
import { InputEntriesState, InputEntry, InputEntryMode } from "../../store/TemplateState"
import { Badge, Box, Button, ButtonGroup, HStack, Icon, Input, SlideFade, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react"
import { BsCheckLg } from "react-icons/bs"
import { ImPlus, ImArrowUp, ImArrowDown } from "react-icons/im"
import { IoCloseSharp } from "react-icons/io5"

const TagComponent = ({children, index}: {children: string, index: number}) => {
    const [inputEntries, setInputEntries] = useRecoilState(InputEntriesState)

    const onRemoveTag = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries[index].value = mutatedInputEntries[index].value.split(";").filter((el) => el != children).join(";")
        setInputEntries(mutatedInputEntries)
    }

    return (
        <Tag
            size="md"
            borderRadius='5px'
            variant='subtle'
            colorScheme='green'
            color="green"
            m="0.3rem 0"
        >   
            <TagLabel>{children}</TagLabel>
            <TagCloseButton onClick={() => onRemoveTag()} />
        </Tag>
    )
}

const TagListComponent = ({index}: {index: number}) => {
    const [inputEntries, setInputEntries] = useRecoilState(InputEntriesState)

    let allValue: string = inputEntries[index].value
    let valueArray: string[] = allValue.split(";").map((el) => el.trim())
    valueArray = valueArray.filter((el) => el != "")

    return (
        <>
        {
            valueArray.map((el, i) => {
                return <TagComponent key={`tag-${index}-${i}`} index={index}>{el}</TagComponent>
            })
        }
        </>
    )
}

const InputBlock = ({data, index}: {data: InputEntry, index: number}) => {
    const [inputEntries, setInputEntries] = useRecoilState(InputEntriesState)
    const [input, setInput] = useState("")

    const isFirst: boolean = index == 0
    const isLast: boolean = index == inputEntries.length-1
    
    const onRemove = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries.splice(index, 1)
        setInputEntries(mutatedInputEntries)
    }

    const onUp = () => {
        console.log("on up")
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        const inputEntry = mutatedInputEntries[index]
        mutatedInputEntries.splice(index, 1)
        mutatedInputEntries.splice(index-1, 0, inputEntry)
        setInputEntries(mutatedInputEntries)
    }

    const onDown = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        const inputEntry = mutatedInputEntries[index]
        mutatedInputEntries.splice(index, 1)
        mutatedInputEntries.splice(index+1, 0, inputEntry)
        setInputEntries(mutatedInputEntries)
    }

    const onCallDelete = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries.forEach((el) => { el.edit = false, el.delete = false} )
        mutatedInputEntries[index].delete = true
        setInputEntries(mutatedInputEntries)
    }

    const onCancelDelete = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries.forEach((el) => { el.edit = false, el.delete = false} )
        mutatedInputEntries[index].delete = false
        setInputEntries(mutatedInputEntries)
    }

    const onEdit = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries.forEach((el) => { el.edit = false, el.delete = false} )
        mutatedInputEntries[index].edit = true
        setInputEntries(mutatedInputEntries)
    }

    const onValidateWord = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries[index].edit = false
        if(input == "") {
            setInput("")
            setInputEntries(mutatedInputEntries)
            return
        }
        setInput("")
        mutatedInputEntries[index].value += `${input};`
        setInputEntries(mutatedInputEntries)
    }

    const onCancelWord = () => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries[index].edit = false
        setInput("")
        setInputEntries(mutatedInputEntries)
    }

    const onChangeSimple = (value: string) => {
        const mutatedInputEntries = inputEntries.map((x, i) => {return {...x}})
        mutatedInputEntries[index].value = value
        setInputEntries(mutatedInputEntries)
    }

    const getDataType = () => {
        if(data.type == InputEntryMode.LIST) {
            return "LIST"
        } else if(data.type == InputEntryMode.SIMPLE) {
            return "SIMPLE"
        }
    }

    const getBgColor = () => {
        if(data.delete) {
            return "rgba(0, 0, 0, 0.3)"
        }
        if(data.type == InputEntryMode.LIST && !data.edit && data.value == "") {
            return "rgba(0, 0, 0, 0.3)"
        }
        if(data.type == InputEntryMode.SIMPLE && data.value == "") {
            return "rgba(0, 0, 0, 0.3)"
        }
        return "transparent"
    }

    return (
        <Box position="relative" display="flex" justifyContent="flex-end" alignItems="center" p="0.2rem" w="100%">
            <Box position="relative" border="solid 1px grey" w="100%" minH="80px" mr=".5rem" transition="500ms" bg={getBgColor()}>
                <Badge position="absolute" zIndex="10" transform="translate(-30%, -50%)" colorScheme="teal" border="solid 1px black">{getDataType()}</Badge>
                {
                    (data.edit && data.type == InputEntryMode.LIST) && (
                        <SlideFade in={true} offsetY="20px">
                            <Box display="flex" h="100" flexDirection="column" p="0.5rem 1rem" justifyContent="center">
                                <Input bg="white" autoFocus={true} placeholder="Write your word" onChange={(e) => setInput(e.target.value)} value={input} />
                                <ButtonGroup m="auto">
                                    <Button size="xs" colorScheme="green" color="white" onClick={() => onValidateWord()}><Icon as={BsCheckLg} /></Button>
                                    <Button size="xs" colorScheme="red" color="white" onClick={() => onCancelWord()}>Cancel</Button>
                                </ButtonGroup>
                            </Box>
                        </SlideFade>
                    )
                }
                {
                    /* SIMPLE View */
                    (!data.delete && data.type == InputEntryMode.SIMPLE) && (
                        <SlideFade in={true} offsetY="20px">
                            <Box display="flex" h="100" flexDirection="column" p="0 1rem" justifyContent="center">
                                <Input bg="white" autoFocus={true} placeholder="Write your single line." onChange={(e) => onChangeSimple(e.target.value)} value={data.value} />
                            </Box>
                        </SlideFade>
                    )
                }
                {
                    /* Delete View */
                    data.delete && (
                        <SlideFade in={true} offsetY="20px">
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" w="100%" h="100">
                                <Text fontWeight="bold">Confirm delete ?</Text>
                                <ButtonGroup>
                                    <Button size="xs" colorScheme="green" color="white" onClick={() => onRemove()}>Yes</Button>
                                    <Button size="xs" colorScheme="red" color="white" onClick={() => onCancelDelete()}>Cancel</Button>
                                </ButtonGroup>
                            </Box>
                        </SlideFade>
                    )
                }
                {
                    /* LIST View */
                    (!data.delete && !data.edit && data.type == InputEntryMode.LIST) && (
                        <SlideFade in={true} offsetY="20px">
                            <Box m="2rem" textAlign="center">
                                <HStack spacing={1} justifyContent="center" wrap="wrap">
                                    <TagListComponent index={index} />
                                    <Button size="xs" colorScheme="green" borderRadius="50px" p="0.2rem" color="white" onClick={() => onEdit()}><Icon as={ImPlus} /></Button>
                                </HStack>
                            </Box>
                        </SlideFade>
                    )
                }
                <Button position="absolute" zIndex="10" right="0" top="0" transform="translate(50%, -50%)" colorScheme="red" w="10px" size="xs" color="white" borderRadius="20px" onClick={() => onCallDelete()}><Icon as={IoCloseSharp} /></Button>
            </Box>
            <Box w="5%" h="100" display="flex" flexDirection="column" justifyContent="flex-end">
                <Button disabled={isFirst} _disabled={{opacity: 0.5, cursor: "default"}} w="20px" size="xs" colorScheme="blue" onClick={() => onUp()}><Icon as={ImArrowUp} /></Button>
                <Button disabled={isLast} _disabled={{opacity: 0.5, cursor: "default"}} w="20px" size="xs" colorScheme="blue" mt="0.2rem" onClick={() => onDown()}><Icon as={ImArrowDown} /></Button>
            </Box>
        </Box>
    )
}

export default InputBlock
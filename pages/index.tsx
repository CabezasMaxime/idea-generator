import { Box, Spacer, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { ControlViewMode, ControlViewStateEnum } from "../store/ControlViewState";
import ControlView from "../ui/components/ControlView";
import ResultView from "../ui/views/ResultView";
import TemplateView from "../ui/views/TemplateView";

export default function Home() {
  const controlViewMode = useRecoilValue(ControlViewMode)

  const getWidth = () => {
    if(controlViewMode.mode == 0) {
      return ["100%", "100%", "60%"]
    } else if(controlViewMode.mode == 1) {
      return ["100%", "100%", "100%"]
    } else if(controlViewMode.mode == 2) {
      return ["100%", "100%", "100%"]
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt="2rem">
      <ControlView />

      <Box p="1rem" mt="1rem" bg="rgba(0, 0, 0, 0.05)">
          <Box textAlign="center" as="i">
              {
                controlViewMode.mode != 2 && (
                  <>
                    <Text>{`You can use two "block".`}</Text>
                    <Text><b>{`Simple:`}</b>{` insert a simple line of text.`}</Text>
                    <Text><b>{`List:`}</b>{` add a list of words. All word become random when generate.`}</Text>
                  </>
                )
              }
              {
                controlViewMode.mode != 0 && (
                  <>
                    <Text>{`Click `}<b>{`"GENERATE"`}</b>{` to create your result.`}</Text>
                  </>
                )
              }
          </Box>
      </Box>

      <Box display="flex" flexDirection="row" w={getWidth()} mt="2rem" flexWrap={["wrap", "wrap", "nowrap"]}>

        <Box transition="250ms" w={["100%", "100%", controlViewMode.template]}>
          { controlViewMode.mode != ControlViewStateEnum.RESULT && <TemplateView />}
        </Box>

        <Spacer m={controlViewMode.mode == ControlViewStateEnum.BOTH ? "0 1rem" : "0"} />

        <Box transition="250ms" w={["100%", "100%", controlViewMode.result]} mt={["3rem", "3rem", "0"]}>
          { controlViewMode.mode != ControlViewStateEnum.TEMPLATE && <ResultView />}
        </Box>
        
      </Box>
    </Box>
  )
}

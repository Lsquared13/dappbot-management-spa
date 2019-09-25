import * as React from "react";
import { copyAndAlert } from "../utils";
import { Box, Text, Icon, Button } from "../../components/ui";
import { Container } from "./../Container";

export interface DappStatusProps {
  onAbiCopy?: () => void;
  buildStatus: string;
}

export const DappStatus: React.SFC<DappStatusProps> = props => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="between"
        alignItems="center"
        padding={5}
      >
        <Text size="lg" smSize="lg" mdSize="lg" lgSize="lg">
          <b>Status</b> -
          <Text
            inline
            color="green"
            size="lg"
            smSize="lg"
            mdSize="lg"
            lgSize="lg"
          >
            {props.buildStatus}
          </Text>
        </Text>
        <Box>
          <Button size="small" theme="outlineBlue" onClick={props.onAbiCopy} >
            ABI <Icon icon="copy" color="blue"/>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default DappStatus;

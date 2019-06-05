import * as React from "react";
import { Box, Text, Icon } from "../../components/ui";
import { Container } from "./../Container";

export interface DappStatusProps {
  onStatusCopy?: () => void;
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
            Available
          </Text>
        </Text>
        <Box>
          <Icon icon="copy" color="blue" onClick={props.onStatusCopy} />
        </Box>
      </Box>
    </Container>
  );
};
export default DappStatus;

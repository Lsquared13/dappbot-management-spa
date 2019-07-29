import * as React from "react";
import Base from "../Base";
import Button from "../Button";
import Box from "../Box";
import Divider from "../Divider";
import Icon from "../Icon";
import Text from "../Text";
import Label from "../Label";

export interface RightSidebarProps {
  /**
   * func, Event -->  onVote
   **/
  onVote?: () => void;
  /**
   * func, Event -->  onTokenClaim
   **/
  onTokenClaim?: () => void;
  /**
   * string, cycle title
   **/
  cycleTitle: string;
  /**
   * string, cycle type - "open" | "close"
   **/
  cycleType: "open" | "close";
  /**
   * string, cycle time
   **/
  cycleTime: string;
  /**
   * string, tokenDescription
   **/
  tokenDescription: string;
  /**
   * number, totalVoters
   **/
  totalVoters: number;
  /**
   * number, nominators
   **/
  nominators: number;
  /**
   * number, voters
   **/
  voters: number;
  /**
   * number, support votes
   **/
  for: number;
  /**
   * number, against votes
   **/
  against: number;
}

export const RightSidebar: React.SFC<RightSidebarProps> = props => {
  const renderVotebtn = () => {
    return (
      <Button size="small" block onClick={props.onVote}>
        <Icon icon="vote" />
        <Box display="inlineBlock" marginLeft={2}>
          <Text color="white">Vote</Text>
        </Box>
      </Button>
    );
  };

  const renderCycleDetail = () => {
    return (
      <Box marginTop={5} marginBottom={5}>
        <Base>
          <Box padding={5} width="100%" display="flex" direction="column">
            <Box marginBottom={2}>
              <Text size="lg" bold>
                {props.cycleTitle}{" "}
                <Label htmlFor="" type="filled" size="small">
                  {props.cycleType}
                </Label>
              </Text>
            </Box>
            <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
              {props.cycleTime}
            </Text>
          </Box>
        </Base>
      </Box>
    );
  };

  const renderTokenDetail = () => {
    return (
      <Box marginTop={5} marginBottom={5}>
        <Base>
          <Box
            padding={5}
            width="100%"
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box marginBottom={4}>
              <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
                {props.tokenDescription}
              </Text>
            </Box>
            <Button style="complete" size="small" onClick={props.onTokenClaim}>
              <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
                Claim Tokens
              </Text>
            </Button>
          </Box>
        </Base>
      </Box>
    );
  };

  const renderNominators = () => {
    return (
      <Box marginTop={5} marginBottom={5}>
        <Box display="flex" justifyContent="between">
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
            Total voters
          </Text>
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
            {props.totalVoters}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="between"
          marginTop={2}
          marginBottom={2}
        >
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            Nominators
          </Text>
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            {props.nominators}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="between"
          marginTop={2}
          marginBottom={2}
        >
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            Voters
          </Text>
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            {props.voters}
          </Text>
        </Box>
      </Box>
    );
  };

  const renderVotes = () => {
    return (
      <Box marginTop={5} marginBottom={5}>
        <Box display="flex" justifyContent="between">
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
            Total votes
          </Text>
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
            1000
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="between"
          marginTop={2}
          marginBottom={2}
        >
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            For
          </Text>
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            {props.for}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="between"
          marginTop={2}
          marginBottom={2}
        >
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            Against
          </Text>
          <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm" color="gray">
            {props.against}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box width={225}>
      {renderVotebtn()}
      {renderCycleDetail()}
      {renderTokenDetail()}
      {renderNominators()}
      <Divider type="secondary" />
      {renderVotes()}
    </Box>
  );
};

RightSidebar.displayName = "RightSidebar";

export default RightSidebar;

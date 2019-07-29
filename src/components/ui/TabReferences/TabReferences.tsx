import * as React from "react";
import Box from "../Box";
import Text from "../Text";
import Divider from "../Divider";
import Icon from "../Icon";
import Button from "../Button";
import Avatar from "../Avatar";
import TextField from "../TextField";
import TextArea from "../TextArea";
import Label from "../Label";
import SelectList from "../SelectList";
import Checkbox from "../Checkbox";

interface TabProfileProps {}
interface TabProfileState {
  selectedCurrency: any;
  selectedTime: any;
  selectedLanguage: any;
  nomiChecked: boolean;
  voteChecked: boolean;
  excChecked: boolean;
}

const currencyOptions = [
  {
    value: "bos",
    label: "United States Dollar (USD)"
  },
  {
    value: "la",
    label: "United States Dollar (USD)"
  },
  {
    value: "sf",
    label: "United States Dollar (USD)"
  }
];

const timeZoneOptions = [
  {
    value: "bos",
    label: "(GMT-08:00) Pacific Time (..."
  },
  {
    value: "la",
    label: "(GMT-08:00) Pacific Time (..."
  },
  {
    value: "sf",
    label: "(GMT-08:00) Pacific Time (..."
  }
];

const languageOptions = [
  {
    value: "bos",
    label: "English"
  },
  {
    value: "la",
    label: "English"
  },
  {
    value: "sf",
    label: "English"
  }
];

export default class TabReferences extends React.Component<
  TabProfileProps,
  TabProfileState
> {
  state = {
    selectedCurrency: currencyOptions[0].value,
    selectedTime: timeZoneOptions[0].value,
    selectedLanguage: languageOptions[0].value,
    nomiChecked: false,
    voteChecked: true,
    excChecked: false
  };

  handleNomiChecked = (e: any) => {
    console.log(e);
    this.setState({ nomiChecked: e.checked });
  };


  handleVoteChecked = (e: any) => {
    console.log(e);
    this.setState({ voteChecked: e.checked });
  };


  handleExcChecked = (e: any) => {
    console.log(e);
    this.setState({ excChecked: e.checked });
  };

  render() {
    return (
      <Box>
        <Box padding={9}>
          <Box marginBottom={5}>
            <Text
              color="darkGray"
              size="xl"
              lgSize="xl"
              smSize="xl"
              mdSize="xl"
              bold={true}
            >
              {" "}
              Preferences{" "}
            </Text>
          </Box>
          <Divider type="secondary" />
          <Box display="flex" direction="column" width={"100%"}>
            <Box display="flex" direction="column" width="30%" marginTop={6}>
              <Text
                color="gray"
                size="xs"
                lgSize="xs"
                smSize="xs"
                mdSize="xs"
                bold={true}
              >
                {" "}
                LOCAL CURRENCY{" "}
              </Text>
              <SelectList
                id="city"
                name="city"
                onChange={({ event, value }) => {
                  this.setState({ selectedCurrency: value });
                }}
                options={currencyOptions}
                placeholder="Select city"
                value={this.state.selectedCurrency}
              />
            </Box>
            <Box display="flex" direction="column" width="30%" marginTop={6}>
              <Text
                color="gray"
                size="xs"
                lgSize="xs"
                smSize="xs"
                mdSize="xs"
                bold={true}
              >
                {" "}
                TIME ZONE{" "}
              </Text>
              <SelectList
                id="city"
                name="city"
                onChange={({ event, value }) => {
                  this.setState({ selectedTime: value });
                }}
                options={timeZoneOptions}
                placeholder="Select city"
                value={this.state.selectedTime}
              />
            </Box>
            <Box display="flex" direction="column" width="30%" marginTop={6}>
              <Text
                color="gray"
                size="xs"
                lgSize="xs"
                smSize="xs"
                mdSize="xs"
                bold={true}
              >
                {" "}
                LANGUAGE{" "}
              </Text>
              <SelectList
                id="city"
                name="city"
                onChange={({ event, value }) => {
                  this.setState({ selectedLanguage: value });
                }}
                options={languageOptions}
                placeholder="Select city"
                value={this.state.selectedLanguage}
              />
            </Box>
          </Box>
        </Box>
        <Box padding={9}>
          <Box marginBottom={5}>
            <Text
              color="darkGray"
              size="xl"
              lgSize="xl"
              smSize="xl"
              mdSize="xl"
              bold={true}
            >
              {" "}
              Notifications{" "}
            </Text>
          </Box>
          <Divider type="secondary" />
          <Box display="flex" direction="column" width={"100%"}>
            <Box display="flex" direction="column" width="30%" marginTop={6}>
              <Text
                color="gray"
                size="xs"
                lgSize="xs"
                smSize="xs"
                mdSize="xs"
                bold={true}
              >
                {" "}
                SEND ME EMAILS WHEN{" "}
              </Text>
              <Box
                alignItems="center"
                direction="row"
                display="flex"
                marginTop={2}
              >
                <Checkbox
                  checked={this.state.nomiChecked}
                  id="usa"
                  name="usa"
                  onChange={this.handleNomiChecked}
                />
                <label htmlFor="usa">
                  <Box paddingX={2}>
                    <div
                      style={{
                        fontFamily: "DIN Round Pro",
                        fontSize: 18,
                        color: "#2B333F"
                      }}
                    >
                      I receive a nomination
                    </div>
                  </Box>
                </label>
              </Box>
              <Box
                alignItems="center"
                direction="row"
                display="flex"
                marginTop={2}
              >
                <Checkbox
                  checked={this.state.voteChecked}
                  id="usa"
                  name="usa"
                  onChange={this.handleVoteChecked}
                />
                <label htmlFor="usa">
                  <Box paddingX={2}>
                    <div
                      style={{
                        fontFamily: "DIN Round Pro",
                        fontSize: 18,
                        color: "#2B333F"
                      }}
                    >
                      I receive votes
                    </div>
                  </Box>
                </label>
              </Box>
              <Box
                alignItems="center"
                direction="row"
                display="flex"
                marginTop={2}
              >
                <Checkbox
                  checked={this.state.excChecked}
                  id="usa"
                  name="usa"
                  onChange={this.handleExcChecked}
                />
                <label htmlFor="usa">
                  <Box paddingX={2}>
                    <div
                      style={{
                        fontFamily: "DIN Round Pro",
                        fontSize: 18,
                        color: "#2B333F"
                      }}
                    >
                      I send or receive EXC
                    </div>
                  </Box>
                </label>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box marginTop={5}>
          <Divider type="secondary" />
          <Box
            position="absolute"
            right
            direction="row"
            marginRight={5}
            marginTop={3}
          >
            <Label htmlFor="" color="darkGray" size="large">
              CANCEL
            </Label>
            <Button type="button" theme="cta" style="standard" size="small">
              SAVE
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

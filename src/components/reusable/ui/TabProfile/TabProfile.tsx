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

interface TabProfileProps {}
interface TabProfileState {
  activeIndex: number;
}

export default class TabProfile extends React.Component<
  TabProfileProps,
  TabProfileState
> {
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
              User Profile{" "}
            </Text>
          </Box>
          <Divider type="secondary" />
          <Box display="flex" direction="row" width={"100%"}>
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
                CHANGE PICTURE{" "}
              </Text>
              <Box
                marginTop={5}
                display="flex"
                direction="row"
                marginBottom={7}
              >
                <Avatar
                  size="lg"
                  src={require("../../../../images/avatar.png")}
                  name="Keerthi"
                />
                <Button
                  type="button"
                  theme="cta"
                  style="complete"
                  size="small"
                  className="btn-upload"
                >
                  <Icon icon="send" type="thick" color="darkGray" /> UPLOAD
                </Button>
              </Box>
              <Text
                color="gray"
                size="xs"
                lgSize="xs"
                smSize="xs"
                mdSize="xs"
                bold={true}
              >
                {" "}
                EMAIL{" "}
              </Text>
              <TextField
                className="txt-email"
                type="email"
                placeholder="Email Address"
                name="emailAddress"
                onChange={() => {}}
                value={"katie@eximchain.com"}
                id="email"
              />
            </Box>

            <Box width="70%" display="flex" direction="column" marginTop={6}>
              <Text
                color="gray"
                size="xs"
                lgSize="xs"
                smSize="xs"
                mdSize="xs"
                bold={true}
              >
                {" "}
                BIO{" "}
              </Text>
              <TextArea
                className="txt-bio"
                id="bio"
                value=""
                placeholder="Tell the community a bit about yourself."
                name="bio"
                onChange={() => {}}
              />
              <Text
                color="gray"
                size="xs"
                lgSize="xs"
                smSize="xs"
                mdSize="xs"
                bold={true}
              >
                {" "}
                PASSWORD{" "}
              </Text>
              <Button
                type="button"
                theme="cta"
                style="complete"
                size="small"
                className="btn-changepswd"
              >
                CHANGE PASSWORD
              </Button>
              <Text
                className="txt-auth"
                color="blue"
                size="sm"
                lgSize="sm"
                smSize="sm"
                mdSize="sm"
              >
                Enable 2-factor Authentication
              </Text>
            </Box>
          </Box>
        </Box>
        <Box padding={8}>
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
              KYC Details{" "}
            </Text>
          </Box>
          <Divider type="secondary" />
          <Box display="flex" direction="column" marginTop={6} marginBottom={2}>
            <Text
              color="gray"
              size="xs"
              lgSize="xs"
              smSize="xs"
              mdSize="xs"
              bold={true}
            >
              {" "}
              MEMBER SINCE{" "}
            </Text>
          </Box>
          <Text
            color="darkGray"
            size="sm"
            lgSize="sm"
            smSize="sm"
            mdSize="sm"
            bold={true}
            textTransform="capitalize"
          >
            {" "}
            65%{" "}
          </Text>
          <Button
            type="button"
            theme="cta"
            style="complete"
            size="small"
            className="btn-changepswd"
          >
            REQUEST A KYC INFO CHANGE
          </Button>
        </Box>
        <Box marginLeft={8} marginTop={3}>
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
              Addresses{" "}
            </Text>
          </Box>
          <Divider type="secondary" />
        </Box>
        <Box marginTop={5}>
        <Divider type="secondary"/>
        <Box position="absolute" right direction="row" marginRight={5} marginTop={3}>
            <Label htmlFor="" color="darkGray" size="large">
              CANCEL
            </Label>
            <Button
              type="button"
              theme="cta"
              style="standard"
              size="small"
            >
              SAVE
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

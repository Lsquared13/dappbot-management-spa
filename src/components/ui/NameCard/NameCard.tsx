import * as React from "react";
import Base from "../Base";
import Box from "../Box";
import Icon from "../Icon";
import Avatar from "../Avatar";
import Text from "../Text";
// import { Base, Box, Icon, Avatar, Text } from "./../../components";

export interface NameCardProps {
  /**
   * function, onClick event
   **/
  onClick?: () => void;
  /**
   * boolean, show block maker icon if profile is of blockmaker
   * @default false
   **/
  isBlockMaker?: boolean;
  /**
   * string, profile image
   **/
  profileImage?: string;
  /**
   * string, name
   **/
  profileName: string;
  /**
   * string, size
   * md | lg
   * @default lg
   **/
  size?: "md" | "lg";

  onNameChange: (name: any) => void;
}

export interface NameCardState{
  name:string;
}

export class NameCard extends React.Component<NameCardProps,NameCardState> {
  static defaultProps: { isBlockMaker: boolean; profileName: string; size: string; };
  static displayName: string;
  constructor(props:any){
    super(props)
  }

  state = {
    name: this.props.profileName
  };

  
  render() {
    const {
      isBlockMaker,
      onClick,
      profileImage,
      profileName,
      size,
      onNameChange
    } = this.props;
    
    return (
      <Base type="pill">
        <Box
          onClick={onClick}
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar src={profileImage} size="md" name={profileName} />
          <Text truncate size={size} smSize={size} mdSize={size} lgSize={size}>
            <Box display="inlineBlock" marginRight={2} marginLeft={2}>
              {/* {profileName} */}
              <input
                type="text"
                value={this.state.name}
                style={{ border: 0 }}
                onChange={(event: any) => {
                  this.setState({ name: event.target.value });
                  onNameChange(event.target.value);
                }}
              />
            </Box>
            {isBlockMaker && (
              <Box display="inlineBlock" marginRight={2}>
                <Icon icon="blockmaker" />
              </Box>
            )}
          </Text>
        </Box>
      </Base>
    );
  }
}

NameCard.defaultProps = {
  isBlockMaker: false,
  profileName: "",
  size: "lg"
};

NameCard.displayName = "NameCard";

export default NameCard;

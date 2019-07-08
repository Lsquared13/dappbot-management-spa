import * as React from "react";
import Container from "../Container";
import { Box, Text } from "../../ui";

export interface TitleProps {
  padding?: string;
  title: React.ReactNode;
}

export const Title: React.SFC<TitleProps> = props => {
  let { padding, title } = props;
  return (
    <Container padding={padding}>
      <Box
        display="flex"
        justifyContent="between"
        alignItems="center"
        padding={5}
      >
        <Text
          bold
          size="lg"
          smSize="lg"
          mdSize="lg"
          lgSize="lg"
          textTransform="capitalize"
        >
          {title}
        </Text>
      </Box>
    </Container>
  );
};

Title.defaultProps = {
  padding: "18%"
};

Title.displayName = "Title";

export default Title;

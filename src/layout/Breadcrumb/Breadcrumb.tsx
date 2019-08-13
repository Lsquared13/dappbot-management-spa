import * as React from "react";
import Container from "../Container";
import { Box, Text } from "../../components/ui";
import { Router, Link, navigate, RouteComponentProps } from "@reach/router";

export interface BreadcrumbProps {
  padding?: string;
  title: React.ReactNode;
}

const NavLink = ({ ...props }) => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        const isActive = isPartiallyCurrent;
        return {
          style: {
            display: isActive ? "inline-block" : "none",
            color: isActive ? "black" : "none",
            textDecoration: "none"
          }
        };
      }}
    />
  );
};

const Breadcrumbs: React.SFC<BreadcrumbProps> = props => (
  <nav>
    <NavLink to="/home">
      {" "}
      DASHBOARD{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /  
      </span>
    </NavLink>
      {" "}
    <NavLink to="/home/new/step-1">
      {" "}
      NEW DAPP{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /
      </span>
    </NavLink>
    
    <NavLink to="/home/new/step-2">
      {" "}
      CONFIGURE DAPP{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /
      </span>
    </NavLink>
    <NavLink to={`/home/new/building/${props.title}`}>
      {" "}
      BUILD IN PROGRESS{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /
      </span>
    </NavLink>
    <NavLink to={`/home/${props.title}`}>
      {" "}
      {props.title}{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /
      </span>
    </NavLink>
    {" "}
    <NavLink to={`/home/${props.title}/delete`}>
      {" "}
      DELETE{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /
      </span>
    </NavLink>
    <NavLink to={`/home/${props.title}/settings`}>
      {" "}
      GENERAL SETTINGS{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /
      </span>
    </NavLink>
    <NavLink to="/home/user-settings">
      {" "}
      SETTINGS{" "}
      <span style={{ color: "black", textDecoration: "none !important" }}>
        /  
      </span>
    </NavLink>
  </nav>
);
export const Breadcrumb: React.SFC<BreadcrumbProps> = props => {
  let { padding, title } = props;
  return (
    <Container color="lightGray" padding={padding}>
      <Box
        display="flex"
        justifyContent="between"
        alignItems="center"
        paddingY={4}
      >
        <Text
          size="xs"
          smSize="xs"
          mdSize="xs"
          lgSize="xs"
          textTransform="uppercase"
        >
          <Breadcrumbs title={title}/>
        </Text>
      </Box>
    </Container>
  );
};

Breadcrumb.defaultProps = {
  padding: "18%"
};

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;

import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Container, Breadcrumb, Title } from "../layout";
import { Box } from "../components/ui";
import SettingHeader from "../components/reusable/settings/Header";
import Profile, { ProfileState } from "../layout/Profile";
import Password, { PasswordState } from "../layout/Password";
import Billing, {
  SubscriptionPlan,
  SubscriptionDetail,
  SubscriptionChanges
} from "../layout/Billing";
import { UserResponseData } from "../types";

export interface SettingsContainerProps extends RouteComponentProps {
  user : UserResponseData;
  /* Profile tab props */
  onProfileInputChange?: (inputs: ProfileState) => void;
  onProfileDelete: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ProfileState
  ) => void;
  onProfileSave: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ProfileState
  ) => void;

  /* Password tab props */
  onPasswordSave: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: PasswordState
  ) => void;
  onPasswordInputChange?: (inputs: PasswordState) => void;

  /* Billing tab props */
  subscriptionPlan: SubscriptionPlan;
  onCancelSubscription?: () => void;
  onCreateSubscription?: (newPlan: SubscriptionDetail) => void;
  onPurchaseDapps?: () => void;
  onViewPastInvoice?: () => void;
  onRenewSubscription?: (renewPlan: SubscriptionDetail) => void;
  onSave?: (subscriptionDetail: SubscriptionChanges) => void;
  onUpdateSubscription?: (subscriptionPlan: SubscriptionDetail) => void;
}

export interface SettingState {
  activeIndex: number;
  activeTab: string;
}

export default class SettingContianer extends React.Component<
  SettingsContainerProps,
  SettingState
> {
  state = {
    activeIndex: 0,
    activeTab: "Profile"
  };

  handleChange = ({ activeTabIndex, event }: any) => {
    event.preventDefault();
    this.setState({
      activeIndex: activeTabIndex,
      activeTab:
        activeTabIndex === 0
          ? "Profile"
          : activeTabIndex === 2
          ? "Billing"
          : "Password"
    });
  };

  render() {
    return (
      <Box>
        <Breadcrumb title={"none"} />

        <SettingHeader
          activeIndex={this.state.activeIndex}
          onHandle={this.handleChange}
        />

        <Title title={this.state.activeTab} />

        <Container>
          <Box>
            {this.state.activeIndex === 0 ? (
              <Profile {...this.props} />
            ) : this.state.activeIndex === 1 ? (
              <Password {...this.props} />
            ) : (
              <Billing {...this.props} />
            )}
          </Box>
        </Container>
      </Box>
    );
  }
}

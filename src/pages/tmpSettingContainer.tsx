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
import { UserResponse } from "../types";


export interface SettingsContainerProps extends RouteComponentProps {
  user : UserResponse;
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
      activeTab:"Profile"
    });
  };

  render() {
    console.log('user in tmpSettingContainer: ',this.props.user);
    return (
      <Box>
        <Breadcrumb title={"none"} />


        <Title title={this.state.activeTab} />

        <Container>
          <Box>
            <Profile {...this.props} />
          </Box>
        </Container>
      </Box>
    );
  }
}

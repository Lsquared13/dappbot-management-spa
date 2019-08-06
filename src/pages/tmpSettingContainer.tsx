import React, { FC, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { Container, Breadcrumb, Title } from "../layout";
import { Box } from "../components/ui";
import Profile, { ProfileState } from "../layout/Profile";
import { PasswordState } from "../layout/Password";
import {
  SubscriptionPlan,
  SubscriptionDetail,
  SubscriptionChanges
} from "../layout/OldBilling";
import Billing from '../components/Billing';
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

export const SettingContainer:FC<SettingsContainerProps> = (props) => {

  // TODO: This page is going to contain the full
  // Settings content for now, both the email and
  // billing info.  As such, this code related to
  // switching tabs is dead for now.  Keeping it
  // as a reminder.
  const [activeTab, setActiveTab] = useState('Profile');
  const [activeIndex, setActiveIndex] = useState(0);
  function handleChange({ activeTabIndex, event }:any){
    event.preventDefault();
    setActiveTab('Profile');
    setActiveIndex(activeTabIndex)
  }
  
  return (
    <Box>
      <Breadcrumb title={"none"} />


      <Title title={'Profile'} />

      <Container>
        <Box>
          <Profile {...props} />
        </Box>
      </Container>

      <Title title={'Billing'} />
      <Container>
        <Box>
          <Billing {...props} />
        </Box>
      </Container>
    </Box>
  );
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

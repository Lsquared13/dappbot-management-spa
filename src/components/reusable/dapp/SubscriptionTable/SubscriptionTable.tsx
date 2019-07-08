import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Modal,
  Table,
  Text,
  TextProps
} from "../../ui";
import SelectList from "../../ui/SelectListOLD";

import { ReferenceLink, ButtonText } from "../utill";

export interface SubscriptionDetail {
  name: string;
  plan: "Standard" | "Professional" | "Enterprise";
  customMarkup: boolean;
  customBrand: boolean;
  customDomain: boolean;
  cost: number;
  active: boolean;
}

export interface SubscriptionChanges {
  newPlan: SubscriptionDetail;
  renewPlan: SubscriptionDetail;
  dapps: SubscriptionDetail[];
}

export interface SubscriptionTableProps {
  dapps: SubscriptionDetail[];
  enableCreateOption: boolean;
  renewDate: string;
  onCancelSubscription?: () => void;
  onCreateSubscription?: (newPlan: SubscriptionDetail) => void;
  onRenewSubscription?: (renewPlan: SubscriptionDetail) => void;
  onSubscriptionChanges?: (SubscriptionChanges: SubscriptionChanges) => void;
  onUpdateSubscription?: (subscriptionPlan: SubscriptionDetail) => void;
}

export type SubscriptionTableState = SubscriptionChanges & {
  showRenewModal: boolean;
  showCancelModal: boolean;
};

export const SUBSCRIPTION_PLANS = [
  {
    value: "Standard",
    label: "Standard"
  },
  {
    value: "Professional",
    label: "Professional"
  },
  {
    value: "Enterprise",
    label: "Enterprise"
  }
];

const Title: React.FC = props => (
  <Box paddingY={2}>
    <Text
      bold
      size="sm"
      smSize="sm"
      mdSize="sm"
      lgSize="sm"
      textTransform="capitalize"
    >
      {props.children}
    </Text>
  </Box>
);

const Content: React.FC<TextProps> = props => (
  <Text {...props} size="sm" smSize="sm" mdSize="sm" lgSize="sm">
    {props.children}
  </Text>
);

export class SubscriptionTable extends React.Component<
  SubscriptionTableProps,
  SubscriptionTableState
> {
  state = {
    dapps: this.props.dapps.map(dapp => ({ ...dapp })),
    newPlan: {
      name: "Create Dapp",
      plan: "Enterprise",
      customMarkup: true,
      customBrand: true,
      customDomain: true,
      cost: 100,
      active: true
    } as SubscriptionDetail,
    renewPlan: {
      name: "Renew Dapp",
      plan: "Enterprise",
      customMarkup: true,
      customBrand: true,
      customDomain: true,
      cost: 100,
      active: true
    } as SubscriptionDetail,
    showCancelModal: false,
    showRenewModal: false
  };

  broadcastChanges = () => {
    let { onSubscriptionChanges } = this.props;
    let { showCancelModal, showRenewModal, ...changes } = this.state;
    onSubscriptionChanges && onSubscriptionChanges(changes);
  };

  onRenewPlanChange = (option: string, value: boolean | number | string) => {
    this.setState(
      prevState => ({
        renewPlan: { ...prevState.renewPlan, [option]: value }
      }),
      this.broadcastChanges
    );
  };

  onNewPlanChange = (option: string, value: boolean | number | string) => {
    this.setState(
      prevState => ({
        newPlan: { ...prevState.newPlan, [option]: value }
      }),
      this.broadcastChanges
    );
  };

  onDappPlanChange = (
    index: number,
    option: string,
    value: boolean | number | string
  ) => {
    let dapps = this.state.dapps.map(dapp => ({ ...dapp }));
    dapps[index][option] = value;
    this.setState(
      {
        dapps
      },
      this.broadcastChanges
    );
  };

  dismissCancelModal = () => {
    this.setState({ showCancelModal: false });
  };

  dismissRenewModal = () => {
    this.setState({ showRenewModal: false });
  };

  render() {
    let {
      enableCreateOption,
      renewDate,
      onCancelSubscription,
      onCreateSubscription,
      onRenewSubscription,
      onUpdateSubscription
    } = this.props;
    let {
      dapps,
      newPlan,
      renewPlan,
      showCancelModal,
      showRenewModal
    } = this.state;

    /* Columns of subscription table */
    let columns = [
      { title: <Title>Dapp Name</Title>, field: "name" },
      { title: <Title>Plan Type</Title>, field: "plan" },
      { title: <Title>Custom Markup</Title>, field: "customMarkup" },
      { title: <Title>Custom Brand</Title>, field: "customBrand" },
      { title: <Title>Custom Domain</Title>, field: "customDomain" },
      { title: <Title>Cost</Title>, field: "cost" },
      { title: <Title>Subscription</Title>, field: "active" },
      { title: <Title />, field: "action" }
    ];

    /* Generate table markup */
    let records: any = dapps.map((dapp, index) => ({
      name: <Content>{dapp.name}</Content>,
      plan: (
        <Box width={205}>
          {/* <Content inline>{dapp.plan}</Content> */}
          <Box display="inlineBlock">
            <SelectList
              id={"dapp_plan_" + index}
              name={"dapp_plan_" + index}
              onChange={({ event, value }) => {
                this.onDappPlanChange(index, "plan", value);
              }}
              options={SUBSCRIPTION_PLANS}
              value={dapp.plan}
            />
          </Box>

          {dapp.plan != "Enterprise" && (
            <Box display="inlineBlock" paddingX={3}>
              <ReferenceLink
                href="#"
                onClick={({ event }) => {
                  event.preventDefault();
                  onUpdateSubscription && onUpdateSubscription(dapp);
                }}
              >
                Upgrade
              </ReferenceLink>
            </Box>
          )}
        </Box>
      ),
      customMarkup: (
        <Checkbox
          id="customMarkup"
          onChange={({ event, checked }) => {
            this.onDappPlanChange(index, "customMarkup", checked);
          }}
          checked={dapp.customMarkup}
        >
          customBrand
        </Checkbox>
      ),
      customBrand: (
        <Checkbox
          id="customBrand"
          onChange={({ event, checked }) => {
            this.onDappPlanChange(index, "customBrand", checked);
          }}
          checked={dapp.customBrand}
        >
          customBrand
        </Checkbox>
      ),
      customDomain: (
        <Checkbox
          id="customDomain"
          onChange={({ event, checked }) => {
            this.onDappPlanChange(index, "customDomain", checked);
          }}
          checked={dapp.customDomain}
        >
          customBrand
        </Checkbox>
      ),
      cost: <Content>$ {dapp.cost}/months</Content>,
      active: <Content>Active</Content>,
      action: null
    }));

    /* Add column for create Dapp row */
    if (enableCreateOption) {
      records.push({
        name: (
          <ReferenceLink
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              onCreateSubscription && onCreateSubscription(newPlan);
            }}
          >
            {newPlan.name}
          </ReferenceLink>
        ),
        plan: (
          <Box display="inlineBlock" width={132}>
            <SelectList
              id="new_plan_type"
              name="new_plan_type"
              onChange={({ event, value }) => {
                this.onNewPlanChange("plan", value);
              }}
              options={SUBSCRIPTION_PLANS}
              value={newPlan.plan}
            />
          </Box>
        ),
        customMarkup: (
          <Checkbox
            id="customMarkup"
            onChange={({ event, checked }) => {
              this.onNewPlanChange("customMarkup", checked);
            }}
            checked={newPlan.customMarkup}
          >
            customBrand
          </Checkbox>
        ),
        customBrand: (
          <Checkbox
            id="customBrand"
            onChange={({ event, checked }) => {
              this.onNewPlanChange("customBrand", checked);
            }}
            checked={newPlan.customBrand}
          >
            customBrand
          </Checkbox>
        ),
        customDomain: (
          <Checkbox
            id="customDomain"
            onChange={({ event, checked }) => {
              this.onNewPlanChange("customDomain", checked);
            }}
            checked={newPlan.customDomain}
          >
            customBrand
          </Checkbox>
        ),
        cost: <Content>$ 100/months</Content>,
        active: <Content inline>Active</Content>,
        action: (
          <ReferenceLink
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              this.setState({ showCancelModal: true });
            }}
          >
            Cancel
          </ReferenceLink>
        )
      });
    }

    records.push({
      name: <Content color="blue">{renewPlan.name}</Content>,
      plan: (
        <Box display="inlineBlock" width={132}>
          <SelectList
            id="renew_plan_type"
            name="renew_plan_type"
            onChange={({ event, value }) => {
              this.onRenewPlanChange("plan", value);
            }}
            options={SUBSCRIPTION_PLANS}
            value={renewPlan.plan}
          />
        </Box>
      ),
      customMarkup: (
        <Checkbox
          id="customMarkup"
          onChange={({ event, checked }) => {
            this.onRenewPlanChange("customMarkup", checked);
          }}
          checked={renewPlan.customMarkup}
        >
          customBrand
        </Checkbox>
      ),
      customBrand: (
        <Checkbox
          id="customBrand"
          onChange={({ event, checked }) => {
            this.onRenewPlanChange("customBrand", checked);
          }}
          checked={renewPlan.customBrand}
        >
          customBrand
        </Checkbox>
      ),
      customDomain: (
        <Checkbox
          id="customDomain"
          onChange={({ event, checked }) => {
            this.onRenewPlanChange("customDomain", checked);
          }}
          checked={renewPlan.customDomain}
        >
          customBrand
        </Checkbox>
      ),
      cost: <Content>$ {renewPlan.cost}/months</Content>,
      active: <Content>Ends {renewDate}</Content>,
      action: (
        <ReferenceLink
          href="#"
          onClick={({ event }) => {
            event.preventDefault();
            this.setState({ showRenewModal: true });
          }}
        >
          Renew
        </ReferenceLink>
      )
    });

    return (
      <Box>
        <Text>Dapps</Text>

        <Box marginTop={2} marginBottom={2}>
          <Divider type="secondary" />
        </Box>

        {/* Render dapps subscription table */}
        <Table columns={columns} records={records} />

        {/* Show Renew Dapp Subscription Modal */}
        {showRenewModal && (
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="Renew subscription"
            heading="Renew Dapp Subscription"
            onDismiss={this.dismissRenewModal}
            role="popup"
            showCloseButton
          >
            <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
              Are you sure you want to renew this Dapp subscription? You will
              regain access to create this Dapp and it will be charged on your
              next billing cycle.
            </Text>
            <Box display="flex" justifyContent="between" marginTop={6}>
              <Button
                size="small"
                theme="outlineBlue"
                onClick={this.dismissRenewModal}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                size="small"
                onClick={() => {
                  this.dismissRenewModal();
                  onRenewSubscription && onRenewSubscription(renewPlan);
                }}
              >
                <ButtonText>Renew Dapp Subscription</ButtonText>
              </Button>
            </Box>
          </Modal>
        )}

        {/* Show End Dapp Subscription Modal */}
        {showCancelModal && (
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="End Dapp Subscription"
            heading="End Dapp Subscription"
            onDismiss={this.dismissCancelModal}
            role="popup"
            showCloseButton
          >
            <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
              Are you sure you want to end this Dapp subscription? If you do,
              this Dapp subcription will not auto-renew and it will not be
              charged on your next billing cycle.
            </Text>
            <Box display="flex" justifyContent="between" marginTop={6}>
              <Button
                size="small"
                theme="outlineBlue"
                onClick={this.dismissCancelModal}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                size="small"
                onClick={() => {
                  this.dismissCancelModal();
                  onCancelSubscription && onCancelSubscription();
                }}
              >
                <ButtonText>End Dapp Subscription</ButtonText>
              </Button>
            </Box>
          </Modal>
        )}
      </Box>
    );
  }
}

export default SubscriptionTable;

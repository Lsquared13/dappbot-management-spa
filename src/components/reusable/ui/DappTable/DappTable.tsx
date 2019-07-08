import React, { Component } from "react";
import Table from "../Table";

interface Props {}

interface State {}

export default class DappTable extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    localStorage.clear();
  }

  render() {
    let columns = [
      { title: "Dapp Name", field: "name" },
      { title: "Network", field: "net" },
      { title: "Contract Address", field: "add" },
      { title: "Dapp URL", field: "url" }
    ];
    let records = [
      {
        name: "beta-test-network",
        net: "Ethereum",
        add: "0x92EB...17BE",
        url: "beta-test-network.dapp.bot"
      },
      {
        name: "mit",
        net: "Eximchain",
        add: "0x92EB...17BE",
        url: "mit.dapp.bot"
      },
      {
        name: "crypto-kitty",
        net: "Ethereum",
        add: "0x92EB...17BE",
        url: "crypto-kitty.dapp.bot"
      },
      {
        name: "hackathon-winner",
        net: "Eximchain",
        add: "0x92EB...17BE",
        url: "hackathon-winner.dapp.bot"
      }
    ];
    return <Table columns={columns} records={records} />;
  }
}

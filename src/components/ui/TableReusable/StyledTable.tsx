import styled, { StyledComponentClass } from "styled-components";

export const StyledTable: StyledComponentClass<
  React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >,
  any,
  React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
> = styled.table`
  &.table {
    font-family: "Inter UI", sans-serif;
    font-size: 13px;
    color: #626b76;
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    background-color: transparent;
  }

  &.table > caption + thead > tr:first-child > td,
  &.table > caption + thead > tr:first-child > th,
  &.table > colgroup + thead > tr:first-child > td,
  &.table > colgroup + thead > tr:first-child > th,
  &.table > thead:first-child > tr:first-child > td,
  &.table > thead:first-child > tr:first-child > th {
    border-top: 0;
  }

  &.table > tbody > tr > td,
  &.table > tbody > tr > th,
  &.table > tfoot > tr > td,
  &.table > tfoot > tr > th,
  &.table > thead > tr > td,
  &.table > thead > tr > th {
    padding: 6px 15px;
    line-height: 1.42857143;
    vertical-align: middle;
    border-bottom: 1px solid #f0f2f4;
    border-top: 0;
    position: relative;
  }

  &.table tr th {
    text-align: left;
    text-transform: uppercase;
    color: #9aa2af;
    font-size: 12px;
    font-family: "Inter UI", sans-serif;
    font-weight: normal;
  }

  &.table tr td {
    .avatar {
      float: left;
    }

    p {
      float: left;
      margin: 7px 0 0 15px;
    }
  }

  &.table > thead > tr > th > a {
    color: #626b76;
  }

  &.table > tbody > tr > td,
  &.table > tbody > tr > th,
  &.table > tfoot > tr > td,
  &.table > tfoot > tr > th,
  &.table > thead > tr > td,
  &.table > thead > tr > th {
    padding: 10px 10px;
    line-height: 1.42857143;
    vertical-align: middle;
    border-bottom: 1px solid #f0f2f4;
    border-top: 0;
    position: relative;
  }

  &.table > tbody > tr:hover {
    background-color: #f7f8f9;
  }

  &.table-member tbody tr td:last-child {
    .btn-small:first-child {
      opacity: 0;
      margin-right: 20px;
    }
  }

  &.table-member tbody tr:hover td {
    .btn-small:first-child {
      opacity: 1;
    }
  }

  &.table-member tr td:last-child,
  &.table-member tr th:last-child {
    text-align: right;

    a {
      color: #626b76;
    }
  }
`;

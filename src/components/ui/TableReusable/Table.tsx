import * as React from "react";
import { StyledTable } from "./StyledTable";

export interface IColumns {
  title: React.ReactNode;
  field: string;
}

export interface TableProps {
  /**
   * array, columns of IColumns
   *
   * IColumns type:
   * [
      {
        title : React.ReactNode
        field : string
      }
     ]
   *
   *
   **/
  columns?: IColumns[];

  /**
   * array, data
   *
   * Data formate:
   * [
      {
        comlumnName1 : value
        comlumnName2 : value
      }
     ]
   *
   *
   **/
  records?: {}[];
}

const generateTableMarkup = (columns: IColumns[], records: any) => {
  let header = (
    <thead>
      <tr>
        {columns.map(column => {
          return <td>{column.title}</td>;
        })}
      </tr>
    </thead>
  );
  let body = (
    <tbody>
      {records.map((item: any) => {
        return (
          <tr>
            {columns.map(column => {
              return <td>{item[column.field]}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
  return [header, body];
};

export const Table: React.SFC<TableProps> = props => {
  const { columns, records, children } = props;
  return (
    <StyledTable className={"table"}>
      {!columns || !records ? children : generateTableMarkup(columns, records)}
    </StyledTable>
  );
};

Table.displayName = "Table";

export default Table;

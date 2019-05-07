import * as React from 'react';
import './Table.scss';
import classnames from 'classnames';

export interface IColumns {
  title: React.ReactNode
  field: string
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
  /**
   * string, custom class prefix for css
   * @default table
   **/
  customClass?: string;
  /**
   * string, class to apply on component
   **/
  className?: string;

}

const generateTableMarkup = (columns: IColumns[], records: any) => {
  let header =
    <thead>
      <tr>
        {columns.map((column) => {
          return <td>{column.title}</td>
        })
        }
      </tr>
    </thead>
  let body =
    <tbody>
      {
        records.map((item: any) => {
          return (
            <tr>
              {
                columns.map((column) => {
                  return <td>{item[column.field]}</td>
                })
              }
            </tr>
          )
        })
      }
    </tbody>
  return [header, body];
}


export const Table: React.SFC<TableProps> = (props) => {
  const { customClass, className, columns, records, children } = props;
  const classes = classnames(customClass, className);
  return (
    <table className={classes}>
      {(!columns || !records) ? children : generateTableMarkup(columns, records)}
    </table>
  );
}

Table.defaultProps = {
  customClass: 'table'
}

export default Table;

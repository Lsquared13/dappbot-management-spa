import * as React from 'react';
import './Table.scss';
import classnames from 'classnames';

export interface TableColumn {
  title?: React.ReactNode
  field: string,
  displayName?: string
}

type CellRenderer = (record:any,field:string)=>React.ReactNode;
type HeaderRenderer = (column:TableColumn)=>React.ReactNode;

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
  columns?: TableColumn[];

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

  /**
   * Function which accepts a record and a field name,
   * then returns the contents of that cell for that record.
   */
  renderCell?: CellRenderer
  
  /**
   * Function which accepts a field name, and then returns
   * the contents of the header box for that field. Overrides
   * columns' title property.
   */
  renderHeader?: HeaderRenderer
}


export const Table: React.SFC<TableProps> = (props) => {
  const { customClass, className, columns, records, children, renderCell, renderHeader } = props;
  const classes = classnames(customClass, className);

  const generateTableMarkup = (columns: TableColumn[], records: any) => {
    let header =
      <thead>
        <tr>
          {columns.map((column) => {
            let headerContents = renderHeader ?
              renderHeader(column) :
              column.title || column.field;
            return <td>{headerContents}</td>
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
                    let cellContents = renderCell ? 
                      renderCell(item, column.field) : 
                      item[column.field]
                    return <td>{cellContents}</td>
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    return [header, body];
  }

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

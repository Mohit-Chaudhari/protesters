import React from 'react';
import { useTable } from 'react-table';
import './TableView.css'; // For styling the table

const TableView = ({ headers, data }) => {
  const columns = headers.map((header) => ({
    Header: header,
    accessor: header,
  }));

  const tableData = data.map((row, index) =>
    headers.reduce((obj, header, colIndex) => {
      obj[header] = row[colIndex] || '';
      return obj;
    }, {})
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: tableData,
  });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;

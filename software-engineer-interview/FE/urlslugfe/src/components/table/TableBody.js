import React from 'react';
import TableRow from './TableRow';

const TableBody = ({
    className = "",
    tableKey = "tableKey",
    columns,
    rows
}) => {
    // Do not render a thing if no columns or rows exists
    if (!columns || !rows) return null;

    return  <div className={"table-body " + className}>
                {
                    rows.map((row, index) =>
                        <TableRow key={tableKey + "row" + index} tableKey={tableKey} columns={columns} row={row} rowIndex={index} />)
                }
            </div>;
};

export default TableBody;
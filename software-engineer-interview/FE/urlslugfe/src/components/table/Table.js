import React from 'react';
import TableBody from './TableBody';
import TableHeaders from './TableHeaders';

const Table = ({
    className = "",
    tableKey = "tableKey",
    columns,
    data,
    children
}) => {
    // Do not render a thing if no columns or data exists
    if (!columns && !data) return null;

    return  <div className={"table " + className}>
                <h2 className="table-caption">{children}</h2>
                <TableHeaders tableKey={tableKey} columns={columns} />
                <TableBody tableKey={tableKey} columns={columns} rows={data} />
            </div>;
};

export default Table;
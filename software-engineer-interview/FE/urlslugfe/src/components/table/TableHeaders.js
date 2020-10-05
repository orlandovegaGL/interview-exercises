import React from 'react';
import CellSimpleText from './CellSimpleText';

const TableHeaders = ({
    className = "",
    tableKey = "tableKey",
    columns
}) => {
    // Do not render a thing if no columns exists
    if (!columns) return null;

    return  <div className={"table-header " + className}>
                {
                    columns.map(({header}, index) =>
                        <CellSimpleText key={tableKey + "header" + index} className="table-header-cell" text={header} />)
                }
            </div>;
};

export default TableHeaders;
import React from 'react';
import CellLink from './CellLink';
import CellSimpleText from './CellSimpleText';

const TableRow = ({
    className = "",
    tableKey = "tableKey",
    columns,
    row,
    rowIndex
}) => {
    // Do not render a thing if no columns or row's values exists
    if (!columns && !row) return null;

    return  <div className={"table-row " + className}>
                {
                    row.map((value, colIndex) => {
                        const key = tableKey + "row" + rowIndex + "column" + colIndex;

                        switch(columns[colIndex].type) {
                            case "text":
                                return <CellSimpleText key={key} text={value} />;
                            case "url":
                                return <CellLink key={key} url={value.url} label={value.label} />;
                            default:
                                return null;
                        }
                    })
                }
            </div>;
};

export default TableRow;
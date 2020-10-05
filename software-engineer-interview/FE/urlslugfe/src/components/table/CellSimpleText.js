import React from 'react';
import Cell from './Cell';

const CellSimpleText = ({
    className = "",
    text
}) => <Cell className={"cell-simple-text " + className}>{text}</Cell>;

export default CellSimpleText;
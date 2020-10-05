import React from 'react';
import Cell from './Cell';

const CellLink = ({
    className = "",
    url,
    label
}) => <Cell className={"cell-link " + className}><a href={url}>{label}</a></Cell>;

export default CellLink;
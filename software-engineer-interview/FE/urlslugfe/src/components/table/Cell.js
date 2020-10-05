import React from 'react';

const Cell = ({
    className = "",
    children
}) => <div className={"cell " + className}>{children}</div>;

export default Cell;
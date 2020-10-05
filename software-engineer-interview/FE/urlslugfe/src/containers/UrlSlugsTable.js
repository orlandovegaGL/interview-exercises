import React from 'react';
import Table from '../components/table/Table';
import './UrlSlugsTable.css'

const UrlSlugsTable = ({
    data
}) =>
    <Table
        tableKey="urlSlugsTable"
        columns={[
            { header: "Description", type: "text" },
            { header: "Slug", type: "url" }
        ]}
        data={data}
    >
        Slugs Table
    </Table>;

export default UrlSlugsTable;
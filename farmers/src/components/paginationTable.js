import React from "react";
import { Table } from "antd";

const PaginatedTableWithTitle = ({ columns, pagination, title,loading, data, tableChange, ...props }) => {

  return (
    <div>
      <h2>{title}</h2>
      <Table
      {...props}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey={'_id'}
        loading={loading}
        onChange={(pagination, filters, sorter) => tableChange(pagination, filters, sorter)}
      />
    </div>
  );
};

export default PaginatedTableWithTitle;

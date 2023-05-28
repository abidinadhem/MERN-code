/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import PaginatedTableWithTitle from "../../../../components/paginationTable";
import { useDispatch, useSelector } from "react-redux";
import { ordersActions } from "../slice";
import { selectGetOrders, selectLoadinggetOrder } from "../slice/selectors";
import { Button, Input, Space, Avatar } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoadinggetOrder);
  const orders = useSelector(selectGetOrders);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    title: "",
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex, close) => {
    setFilters({ ...filters, [dataIndex]: selectedKeys[0] });
    dispatch(
      ordersActions.orders({
        ...pagination,
        filters: { ...filters, [dataIndex]: selectedKeys[0] },
      })
    );
    close();
  };

  const handleReset = (clearFilters, confirm, dataIndex, close) => {
    clearFilters();
    setFilters({ ...filters, [dataIndex]: "" });
    dispatch(
      ordersActions.orders({
        ...pagination,
        filters: { ...filters, [dataIndex]: "" },
      })
    );

    close();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex, close)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex, close)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters, confirm, dataIndex, close)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "_id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "totalPrice",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: true,
      ...getColumnSearchProps("totalPrice"),
    },
  ];

  useEffect(() => {
    dispatch(ordersActions.orders({ ...pagination, filters: { ...filters } }));
  }, []);

  useEffect(() => {
    if (loading === "done") {
      setData(orders.data);
      setPagination({
        current: orders.page,
        pageSize: 10,
        total: orders.totalPages,
      });
    }
  }, [loading]);

  const expandedRowRender = (record) => {
    const col = [
        {
          title: 'Product',
          dataIndex: 'product',
          render:(key) => <p>{key.title}</p>,
          key: 'product',
        },
        {
          title: 'quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
      ];
    return <PaginatedTableWithTitle
    columns={col}
    loading={false}
    pagination={false}
    data={record.items}
    tableChange={(ev) => console.log(ev)}
    title=""
  />
  }

  return (
    <div>
      <PaginatedTableWithTitle
        columns={columns}
        loading={loading !== "done"}
        pagination={pagination}
        data={data}
        expandedRowRender={expandedRowRender}
        tableChange={(ev) => console.log(ev)}
        title="orders"
      />
    </div>
  );
}

export default Orders;

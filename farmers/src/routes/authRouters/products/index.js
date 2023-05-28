/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import PaginatedTableWithTitle from "../../../components/paginationTable";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "./slice";
import { selectLoading, selectproducts,selectloadingRemoveproduct } from "./slice/selectors";
import { Button, Input, Space, Avatar } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Actions from "../../../components/Actions";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoading);
  const products = useSelector(selectproducts);
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
  const removeProd = useSelector(selectloadingRemoveproduct);

  const handleSearch = (selectedKeys, confirm, dataIndex, close) => {
    setFilters({ ...filters, [dataIndex]: selectedKeys[0] });
    dispatch(
      productsActions.products({
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
      productsActions.products({
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

  const deleteRecord = (id) => {
    dispatch(productsActions.loadingRemoveproduct(id));
  };

  const EditRecord = (id) => {
    navigate(`/products/${id}`)
  };

  const columns = [
    {
      title: "image",
      dataIndex: "image",
      render: (image) => <Avatar src={image} />,
      key: "title",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      ...getColumnSearchProps("title"),
    },
    {
      title: "actions",
      dataIndex: "_id",
      key: "_id",
      render: (key) => (
        <Actions
          onEdit={() => EditRecord(key)}
          onDelete={() => deleteRecord(key)}
          showEdit
          showDelete
          id={key}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      productsActions.products({ ...pagination, filters: { ...filters } })
    );
  }, []);

  useEffect(() => {
    if(removeProd === 'done') {
      dispatch(productsActions.products({ ...pagination, filters: { ...filters } }));
    }
  }, [removeProd]);

  useEffect(() => {
    if (loading === "done") {
      setData(products.data);
      setPagination({
        current: products.page,
        pageSize: 10,
        total: products.totalPages,
      });
    }
  }, [loading]);

  return (
    <div>
      <PaginatedTableWithTitle
        columns={columns}
        loading={loading !== "done"}
        pagination={pagination}
        data={data}
        tableChange={(ev) => console.log(ev)}
        title="products"
      />
      <Button onClick={() => navigate("/products/new")} type="primary">
        Add Product
      </Button>
    </div>
  );
}

export default Products;

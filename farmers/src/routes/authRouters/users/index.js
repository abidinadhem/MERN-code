/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import PaginatedTableWithTitle from "../../../components/paginationTable";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "./slice";
import { selectLoading, selectusers, selectloadingRemoveUser } from "./slice/selectors";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Actions from "../../../components/Actions";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeUser = useSelector(selectloadingRemoveUser);
  const loading = useSelector(selectLoading);
  const users = useSelector(selectusers);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex, close) => {
    setFilters({ ...filters, [dataIndex]: selectedKeys[0] });
    dispatch(
      usersActions.users({
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
      usersActions.users({
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
    dispatch(usersActions.loadingRemoveUser(id));

  };

  const EditRecord = (id) => {
    navigate(`/users/${id}`)
  };

  const columns = [
    {
      title: "firstName",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "lastName",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      ...getColumnSearchProps("email"),
    },
    {
      title: "actions",
      dataIndex: "_id",
      key: "_id",
      render: (key) => (
        <Actions
          onEdit={() => EditRecord(key)}
          onDelete={() => deleteRecord(key)}
          showEdit={key === localStorage.getItem('userID')}
          showDelete={key === localStorage.getItem('userID')}
          id={key}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(usersActions.users({ ...pagination, filters: { ...filters } }));
  }, []);

  useEffect(() => {
    if(removeUser === 'done') {
      dispatch(usersActions.users({ ...pagination, filters: { ...filters } }));
    }
  }, [removeUser]);

  useEffect(() => {
    if (loading === "done") {
      setData(users.data);
      setPagination({
        current: users.page,
        pageSize: 10,
        total: users.totalPages,
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
        title="Users"
      />
      <Button onClick={() =>navigate('/users/new')} type="primary">
        Add User
      </Button>
    </div>
  );
}

export default Users;

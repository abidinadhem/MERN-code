import React, { useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate,useLocation } from "react-router-dom";

const { Header } = Layout;

function MyHeader() {
  const {pathname} = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([ pathname === '/' ? "1" : pathname === '/about' ? '2' : '3']);
  const navigate = useNavigate()
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };


  return (
    <Header style={{ width: "100%", backgroundColor: "#022e0d" }}>
      <div className="d-flex jc-sp">
        <div>
          <Menu
            style={{ backgroundColor: "#022e0d" }}
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
          >
            <Menu.Item
              style={{
                color: "#fff",
                backgroundColor: selectedKeys.includes("1") || pathname === '/'
                  ? "rgb(0 106 56)"
                  : "",
              }}
              key="1"
            >
              <Link to="/">
                  Home
                </Link>
            </Menu.Item>
            <Menu.Item
              style={{
                color: "#fff",
                backgroundColor: selectedKeys.includes("2")|| pathname === '/about'
                  ? "rgb(0 106 56)"
                  : "",
              }}
              key="2"
            >
                <Link to="/about">
                  About
                </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Avatar
            style={{ backgroundColor:  pathname === '/login' ? "rgb(0 106 56)" : 'rgb(83 214 152)' }}
            onClick={()=>navigate('login')}
            icon={<UserOutlined />}
          />
        </div>
      </div>
    </Header>
  );
}

export default MyHeader;

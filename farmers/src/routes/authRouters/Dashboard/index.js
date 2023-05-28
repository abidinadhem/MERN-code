import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Header from "../../../components/Header";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "../users";
import AddUser from "../users/AddUser";
import EditUser from "../users/EditUser";
import Products from "../products";
import Orders from "../orders";
import GetOrder from "../orders/GetOrder";
import AddProduct from "../products/AddProduct";
import EditProduct from "../products/EditProduct";
import { useSelector } from "react-redux";
import { selectuser } from "../../unAuthRoutes/login/slice/selectors";
import { useDispatch } from "react-redux";
import { ordersActions } from "../orders/slice";

const { Content, Sider } = Layout;

function Dashboard() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersActions.initOrderItems(""));
  }, []);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/users">
                  <UserOutlined></UserOutlined>Users
                </Link>
              </Menu.Item>
              {user ? (
                user.roles === "farmers" ? (
                  <Menu.Item key="2">
                    <Link to="/products">
                      <UserOutlined></UserOutlined>Products
                    </Link>
                  </Menu.Item>
                ) : undefined
              ) : undefined}
              {user ? (
                user.roles === "Consumers" ? (
                  <Menu.Item key="2">
                    <Link to="/orders">
                      <UserOutlined></UserOutlined>Market place
                    </Link>
                  </Menu.Item>
                ) : undefined
              ) : undefined}
                {user ? (
                user.roles === "Consumers" ? (
                  <Menu.Item key="3">
                    <Link to="/orderitems">
                      <UserOutlined></UserOutlined>Orders
                    </Link>
                  </Menu.Item>
                ) : undefined
              ) : undefined}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Header />
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/users/new" element={<AddUser />} />
                <Route path="/users/:id" element={<EditUser />} />
                {user ? (
                  user.roles === "farmers" ? (
                    <Route path="/products/:id" element={<EditProduct />} />
                  ) : undefined
                ) : undefined}
                {user ? (
                  user.roles === "farmers" ? (
                    <Route path="/products" element={<Products />} />
                  ) : undefined
                ) : undefined}
                {user ? (
                  user.roles === "farmers" ? (
                    <Route path="/products/new" element={<AddProduct />} />
                  ) : undefined
                ) : undefined}
                {user ? (
                  user.roles === "Consumers" ? (
                    <Route path="/orders" element={<Orders />} />
                  ) : undefined
                ) : undefined}
                {user ? (
                  user.roles === "Consumers" ? (
                    <Route path="/orderitems" element={<GetOrder />} />
                  ) : undefined
                ) : undefined}
                <Route path="*" element={<Navigate to="/users" replace />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Dashboard;

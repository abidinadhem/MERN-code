import React, { useState } from "react";
import { Badge, Layout, Modal, theme } from "antd";
import { Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../routes/unAuthRoutes/login/slice";
import { selectuser } from "../routes/unAuthRoutes/login/slice/selectors";
import { selectOrderItems } from "../routes/authRouters/orders/slice/selectors";
import OrderSummary from "./orderSummary";

const { Header } = Layout;

function HeaderApp() {
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  const user = useSelector(selectuser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    {
      key: "1",
      label: <Link to={"users/" + localStorage.getItem('userID')}>Profile</Link>,
    },
    {
      key: "2",
      label: <div onClick={() => dispatch(authActions.logout())}>Logout</div>,
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ marginRight: "7%" }}>
        {user.roles === "Consumers" && (
          <Badge style={{ marginRight: 10 }} count={orderItems.length}>
            <Avatar
              onClick={() => setIsModalOpen(true)}
              style={{ marginRight: 10 }}
              size={40}
              icon={<ShopOutlined />}
            />
          </Badge>
        )}
        <Dropdown
          menu={{
            items,
          }}
          placement="topCenter"
        >
          <Avatar size={40} icon={<UserOutlined />} />
        </Dropdown>
      </div>
      <Modal
        title="Order Summary"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <OrderSummary />
      </Modal>
    </Header>
  );
}

export default HeaderApp;

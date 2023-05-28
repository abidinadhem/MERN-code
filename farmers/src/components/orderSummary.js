import { Button, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrderItems,
  selectTotal,
} from "../routes/authRouters/orders/slice/selectors";
import { ordersActions } from "../routes/authRouters/orders/slice";
import { List, Statistic } from "antd";

function OrderSummary({ isModalOpen, setIsModalOpen }) {
  const orderItems = useSelector(selectOrderItems);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  return (
    <Row style={{ width: "100%" }}>
      <List
        style={{ width: "100%" }}
        header={<div>Order Summary</div>}
        dataSource={orderItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.product.title} />
            <div>
              {item.quantity} x {item.product.price} ={" "}
              {item.quantity * item.product.price}
            </div>
          </List.Item>
        )}
      />
      <Statistic title="Total Price" value={total} />
      <Button onClick={() => dispatch(ordersActions.addOrder(orderItems))}>
        Submit
      </Button>
    </Row>
  );
}

export default OrderSummary;

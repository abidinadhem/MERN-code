/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Modal } from "antd";
import Draggable from "react-draggable";
import DragButton from "../../../components/DragButton";
import { useDispatch, useSelector } from "react-redux";
import { ordersActions } from "./slice";
import {
  selectLoading,
  selectproducts,
  selectLoadingAddOrder,
  selectOrderItems,
} from "./slice/selectors";
import OrderSummary from "../../../components/orderSummary";

function Orders() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const products = useSelector(selectproducts);
  const loadingAddOrder = useSelector(selectLoadingAddOrder);
  const orderItems = useSelector(selectOrderItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(loadingAddOrder === 'done') {
      setIsModalOpen(false)
    }
  }, [loadingAddOrder]);

  useEffect(() => {
    dispatch(ordersActions.products(""));
    console.clear();
  }, []);

  const addItemToCart = (item) => {
    dispatch(ordersActions.addOrderItems(item));
  };

  const removeItemFromCart = (index) => {};

  const exist = (item) => {
    const index = orderItems
      ? orderItems.findIndex((key) => key.product._id === item._id)
      : -1;
    return index === -1;
  };

  const orderByIndex = (item) => {
    const index = orderItems
      ? orderItems.findIndex((key) => key.product._id === item._id)
      : -1;
    return index === -1 ? null : orderItems[index];
  };

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
    <div>
      <h1>Shopping Cart</h1>
      {loading === "done" && (
        <Row gutter={16}>
          {products.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            products.map((item, index) => (
              <Col key={index} xs={24} sm={24} md={8} lg={8}>
                <Card
                  title={item.title}
                  extra={
                    exist(item) ? (
                      <Button onClick={() => addItemToCart(item)}>Add</Button>
                    ) : (
                      <Row>
                        <Col>
                          <Button
                            onClick={() =>
                              dispatch(
                                ordersActions.changeOrderItems({
                                  key: "+",
                                  item,
                                })
                              )
                            }
                          >
                            +
                          </Button>
                        </Col>
                        <Col>
                          <Button>{orderByIndex(item).quantity}</Button>
                        </Col>
                        <Col>
                          <Button
                            onClick={() =>
                              dispatch(
                                ordersActions.changeOrderItems({
                                  key: "-",
                                  item,
                                })
                              )
                            }
                          >
                            -
                          </Button>
                        </Col>
                      </Row>
                    )
                  }
                  cover={
                    <img
                      width={100}
                      height={150}
                      alt={item.title}
                      src={item.image}
                    />
                  }
                >
                  <p>user: {item.user.firstName + " " + item.user.lastName}</p>
                  <p>quantity: {item.quantity}</p>
                  <p>Price: tnd{item.price}</p>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}

      <DragButton clickButton={() => setIsModalOpen(true)} />
      <Modal
        title="Order Summary"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <OrderSummary />
      </Modal>
    </div>
  );
}

export default Orders;

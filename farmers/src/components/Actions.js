import React from "react";
import { Row, Col } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Actions(props) {

    return (
    <Row>
      {props.showEdit && (
        <Col style={{ marginRight: 10, fontSize: 20 }}>
          <EditOutlined onClick={()=>props.onEdit()} />
        </Col>
      )}
      {props.showDelete && (
        <Col style={{ fontSize: 20 }}>
          <DeleteOutlined onClick={()=>props.onDelete()} style={{ color: "red" }} color="red" />
        </Col>
      )}
    </Row>
  );
}

export default Actions;

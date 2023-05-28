import { Button, Badge } from "antd";
import React from "react";
import Draggable from "react-draggable";
import shop from "../images/shop.png";
import { useSelector } from "react-redux";
import { selectOrderItems } from "../routes/authRouters/orders/slice/selectors";

function DragButton({clickButton}) {
  const orderItems = useSelector(selectOrderItems);
  const handleDrag = (e, ui) => {
    // Do something when the button is dragged
  };

  return (
    <div>
      <Draggable handle=".handle" onDrag={handleDrag}>
        <Button
          style={{ width: 70, zIndex: 999, height: 70 }}
          onClick={clickButton}
          className="handle"
        >
          <Badge count={orderItems.length}>
            <img
              style={{ zIndex: 1 }}
              alt="shp"
              width={50}
              height={50}
              src={shop}
            />
          </Badge>
        </Button>
      </Draggable>
    </div>
  );
}

export default DragButton;

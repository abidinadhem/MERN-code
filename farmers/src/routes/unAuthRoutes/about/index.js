import React from "react";
import "./index.css";
import { Col, Row } from "antd";

function AboutUs() {
  return (
    <div className="about-us">
        <div className="about-section">
          <Row>
            <h1>About Us</h1>
          </Row>
          <Row >
            <Col xs={24} lg={8} md={8}>
              <img
                src={
                  "https://www.shutterstock.com/image-photo/group-multiethnic-business-people-holding-260nw-191139815.jpg"
                }
                style={{width : '100%'}}
                alt="About Us"
              />
            </Col>
            <Col xs={24} lg={16} md={16}>
              <p>
                We are a company that specializes in building React
                applications.
              </p>
              <p>
                Our team of experienced developers can help you build anything
                from simple websites to complex web applications.
              </p>
              <p>
                If you're interested in working with us, please contact us at
                info@yourcompany.com.
              </p>
            </Col>
          </Row>
        </div>
    </div>
  );
}

export default AboutUs;

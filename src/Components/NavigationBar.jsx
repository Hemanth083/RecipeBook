import React from "react";
import { Row, Col, Button, Space } from "antd";
import './navigation.css';
import '../App.css'; // Import your global styles
import { Link } from "react-router-dom";
const NavigationBar = () => {

    return (
        <Row className="custom-navigation" align='middle' justify="space-between" style={{ width: "70%" }}>
            <Col style={{ fontSize: "25px" ,fontWeight:"700" }} className="headerFont">JUST FOOD</Col>
            <Space size={30}>
                <Col>
                    <Link to={'/'}> <Button className="ant-dropdown-link headerFont" type="text">
                        Home
                    </Button></Link>
                </Col>
                <Col>
                    <Link to={'/recipes'}> <Button className="ant-dropdown-link headerFont" type="text">
                        Recipes :
                    </Button></Link>
                </Col>
                <Col className="headerFont">Book</Col>

            </Space>
            <Space size={20}>
                <Button type='primary' color="white" size='large' className="headerFont ">Sign In</Button>
                <Button type="text" color='Black' size="large" className="headerFont ">Sign Up</Button>
            </Space>
        </Row >
    );
}

export default NavigationBar;

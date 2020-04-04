import React from "react";
import { withRouter } from "react-router";
import {
  Card,
  Col,
  Layout,
  Row,
} from "antd";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function LoginRegistrationScreen({isLogin, isHost}) {
  return (
    <Layout>
      <Layout.Content style={{ height: "100vh" }}>
        <Row
          justify="center"
          style={{ height: "100vh" }}
          type="flex"
          align="middle"
        >
          <Col span={8}>
            <Card>
              {isLogin ? <LoginForm/> : <RegistrationForm isHost={isHost}/>}
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default withRouter(LoginRegistrationScreen);

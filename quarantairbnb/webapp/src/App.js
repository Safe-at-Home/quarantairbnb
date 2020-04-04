import React from "react";
import "./App.css";
import { Layout, Menu, Row,Col } from "antd";
import StartingScreen from "./StartingScreen";
import Header from "react-fullpage/dist/Header";

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Layout.Header>
          <Row>
            <Col span={12}>
              <h1 style={{color: "#eee"}}>Quarantairbnb</h1>
            </Col>
            <Col span={12}>
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px", textAlign: "right" }}
              >
                <Menu.Item key="1">Log in</Menu.Item>
                <Menu.Item key="2">Sign up</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Layout.Header>
      </Header>
      <Layout.Content>
        <StartingScreen />
      </Layout.Content>
    </Layout>
  );
}

export default App;

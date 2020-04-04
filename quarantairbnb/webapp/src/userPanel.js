import React from 'react';
import {withRouter} from "react-router";
import {Card, Col, Layout, Menu, Row, Button} from "antd";
import "./App.css"

function UserPanel() {
  return (
    <Layout className="full-page-layout">
      <Sidebar/>
      <Messages/>
    </Layout>
  )
}

const Sidebar = () => (
  <Layout.Sider>
    <HostMenu/>
  </Layout.Sider>
);

const GuestMenu = () => (
  <Menu mode="inline">
    <Menu.Item>
      My request
    </Menu.Item>
    <Menu.Item>
      My messages
    </Menu.Item>
    <Menu.Item>
      Settings
    </Menu.Item>
    <Menu.Item>
      Contact a moderator
    </Menu.Item>
  </Menu>
);

const HostMenu = () => (
  <Menu mode="inline">
    <Menu.Item>
      My offer
    </Menu.Item>
    <Menu.Item>
      My messages
    </Menu.Item>
    <Menu.Item>
      Settings
    </Menu.Item>
    <Menu.Item>
      Contact a moderator
    </Menu.Item>
  </Menu>
);

const Messages = () => (
  <Layout.Content>
    <Row justify="center" type="flex" align="middle" className="full-page-layout">
      <Col span={22}>
        <Card>
          <MyMessage/>
          <TheirMessage/>
          <SendMessage/>
        </Card>
      </Col>
    </Row>
  </Layout.Content>
);

const MyMessage = () => (
  <Row>
    <Col offset={20} span={4}>
      <Message/>
    </Col>
  </Row>
);

const TheirMessage = () => (
  <Row>
    <Col span={4}>
      <Message/>
    </Col>
  </Row>
);

const Message = () => (
  <Card style={{alignContent: 'middle'}}>
    cośtam
  </Card>
);

const SendMessage = () => (
  <Card style={{marginTop: 16}}>
    <Row type="flex" align="middle" className="full-page-layout">
      <Col span={22}>
          <input style={{width: "100%"}}/>
      </Col>
      <Col span={2}>
        <Row type="flex" justify="center">
          <Col span={16}>
            <Button>Send</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Card>
);

export default withRouter(UserPanel);
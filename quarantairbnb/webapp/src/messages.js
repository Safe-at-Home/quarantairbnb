import {Button, Card, Col, Layout, Menu, Row} from "antd";
import React from "react";

const Messages = () => (
  <Layout.Content>
    <Row justify="center" type="flex" align="middle" className="full-page-layout">
      <Col span={22}>
        <Card>
          <Layout>
            <MessagesSidebar/>
            <Layout.Content style={{padding: 16}}>
              <MyMessage messageText={"Cześć"}/>
              <TheirMessage messageText={"A dzień dobry"}/>
              <SendMessage/>
            </Layout.Content>
          </Layout>
        </Card>
      </Col>
    </Row>
  </Layout.Content>
);

const MessagesSidebar = () => (
  <Layout.Sider style={{background: "white"}}>
    <MessageRecipents/>
  </Layout.Sider>
);

const MessageRecipents = () => (
  <Menu>
    <Menu.Item>
      John Brown
    </Menu.Item>
    <Menu.Item>
      Mary Bird
    </Menu.Item>
  </Menu>
);

const MyMessage = (props) => (
  <Row>
    <Col offset={20} span={4}>
      <Message messageText={props.messageText}/>
    </Col>
  </Row>
);

const TheirMessage = (props) => (
  <Row>
    <Col span={4}>
      <Message messageText={props.messageText}/>
    </Col>
  </Row>
);

const Message = (props) => (
  <Card style={{alignContent: 'middle'}}>
    <Row type="flex" align="middle">
      {props.messageText}
    </Row>
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

export default Messages;
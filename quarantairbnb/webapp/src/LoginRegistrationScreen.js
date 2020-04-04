import React from "react";
import {Button, Card, Checkbox, Col, Collapse, Form, Input, Layout, Row} from "antd";

const {Header, Content, Footer} = Layout;
const {Panel} = Collapse;

function LoginRegistrationScreen() {
  return (
    <Layout>
      <Header style={{height: 64}}/>
      <Content style={{padding: '32px 64px'}}>
        <Row justify="center">
          <Col span={8}>
            <Card>
              <RegistrationForm/>
            </Card>
          </Col>
        </Row>
        <Footer/>
      </Content>
    </Layout>
  )
}

const LoginForm = () => (
  <Form
    {...layout}
    name="basic"
    initialValues={{remember: true}}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{required: true, message: 'Please input your username!'}]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{required: true, message: 'Please input your password!'}]}
    >
      <Input.Password/>
    </Form.Item>

    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

const RegistrationForm = () => (
  <Form
    {...layout}
    name="basic"
    initialValues={{remember: true}}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="E-Mail Address"
      name="email"
      rules={[{required: true, message: 'Please input your e-mail address!'},
        {type: 'email', message: 'The input is not a valid e-mail address!'}]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{required: true, message: 'Please input your password!'}]}
    >
      <Input.Password/>
    </Form.Item>

    <Form.Item
      name="confirm"
      label="Confirm Password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({getFieldValue}) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }

            return Promise.reject('The two passwords that you entered do not match!');
          },
        }),
      ]}
    >
      <Input.Password/>
    </Form.Item>

    <Row>
      <Col offset={1} span={23}>
        <Collapse bordered={false} style={{backgroundColor: "white"}} >
          <Panel header="Contact information" key={1}>
            <p>You can fill the information later.</p>
            <p>These information can help the host contact you.</p>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[{pattern: '(\\+(\\d){1,3})?(\\d){4,13}', message: 'The input is not a valid phone number!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Surname"
              name="surname"
            >
              <Input/>
            </Form.Item>
          </Panel>
        </Collapse>
      </Col>
    </Row>

    <Form.Item {...tailLayout} style={{paddingTop: 16}}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

const onFinish = values => {
  console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const additionalLayout = {
  wrapperCol: {offset: 8, span: 16}
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

export default LoginRegistrationScreen;
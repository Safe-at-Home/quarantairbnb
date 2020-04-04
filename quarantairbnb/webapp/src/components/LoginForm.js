import React from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { login, getCurrentUser } from "../actions";
import { Redirect } from "react-router-dom";

const LoginForm = ({
  tryLogin,
  wrongCredentials,
  getCurrent,
  role,
  justRegistered,
}) => {
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await tryLogin(values.email, values.password);
    } catch (err) {
      console.log("Error", err);
    }
    if (!wrongCredentials) {
      await getCurrent();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <>
      {role ? (
        <Redirect to={{ pathname: `/${role}` }} />
      ) : (
        <>
          {wrongCredentials && (
            <Alert
              message="Wrong credentials provided."
              type="error"
              style={{ marginBottom: "20px" }}
            />
          )}
          {justRegistered && (
            <Alert
              message="You have registered successfully. You can log in now"
              type="success"
              style={{ marginBottom: "20px" }}
            />
          )}
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email address"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
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
        </>
      )}
    </>
  );
};

const tryLogin = (email, password) => async (dispatch) => {
  await dispatch(login(email, password));
};

const getCurrent = () => async (dispatch) => {
  await dispatch(getCurrentUser());
};
const mapStateToProps = (state) => ({
  wrongCredentials: state.auth.wrongCredentials,
  role: state.auth.role,
  justRegistered: state.auth.justRegistered,
});

export default connect(mapStateToProps, {
  tryLogin,
  getCurrent,
})(LoginForm);

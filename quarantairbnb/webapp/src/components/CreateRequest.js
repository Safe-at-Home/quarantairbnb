import React from "react";
import { Alert, Input, Form, DatePicker, Button } from "antd";
import { postFromBody } from "../actions";
import * as at from "../actions/types";
import { connect } from "react-redux";

const CreateRequest = ({ postRequest, fetchRequests, setLoading }) => {
  const onFinish = async (values) => {
    console.log(values);
    // we should build a body here and submit
    setLoading(true);
    const body = {};
    await postRequest(body);
    await fetchRequests();
    setLoading(false);
  };
  return (
    <>
      <Alert
        message="You're in good hands!"
        description="The first step to seek help is to create a request. Tell us about your problem, and we'll reach to you soon."
        type="info"
        showIcon
        closable
        style={{ marginBottom: "20px" }}
      />
      <h1>Create a request</h1>
      <Form name="create-request" onFinish={onFinish}>
        <Form.Item
          name="range-picker"
          label="Date range"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select time!",
            },
          ]}
        >
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit request
        </Button>
      </Form>
    </>
  );
};

const postRequest = (body) => async (dispatch) => {
  await dispatch(postFromBody(at.REQUESTS, body));
};
export default connect(() => ({}), { postRequest })(CreateRequest);

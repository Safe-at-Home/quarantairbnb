import React from "react";
import { Alert, Input, Form, DatePicker, Button } from "antd";
import { postFromBody } from "../actions";
import * as at from "../actions/types";
import { connect } from "react-redux";

const CreateOffer = ({ postRequest, fetchOffers, setLoading }) => {
  const onFinish = async (values) => {
    console.log(values);
    // we should build a body here and submit
    setLoading(true);
    const body = {};
    await postRequest(body);
    await fetchOffers();
    setLoading(false);
  };
  return (
    <>
      <Alert
        message="Tell us about your place"
        description="Provide all the details that you think can be relevant for a person in need. Thank you for making the world a better place!"
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
  await dispatch(postFromBody(at.OFFERS, body));
};
export default connect(() => ({}), { postRequest })(CreateOffer);

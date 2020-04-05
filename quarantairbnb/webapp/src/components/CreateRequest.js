import React, { useState } from "react";
import { Alert, Input, Form, DatePicker, Button, InputNumber } from "antd";
import { postFromBody } from "../actions";
import * as at from "../actions/types";
import { connect } from "react-redux";
import MapComp from "./MapComp";
import { Segment, Header, Divider } from "semantic-ui-react";


const CreateRequest = ({ postRequest, fetchRequests, setLoading }) => {
  const [lat, setLat] = useState(52.231838);
  const [long, setLong] = useState(21.0038063);
  const updateParent = (mapLat, mapLong) => {
    setLat(mapLat);
    setLong(mapLong);
  }
  const onFinish = async (values) => {
    console.log(values);
    // we should build a body here and submit
    setLoading(true);
    const body = {
      description: values.description,
      start_date: values["range-picker"][0],
      end_date: values["range-picker"][1],
      latitude: lat,
      longitude: long,
    };
    await postRequest(body);
    await fetchRequests();
    setLoading(false);
  };
  const onChangeLat = (v) => {
    setLat(v);
  };
  const onChangeLng = (v) => {
    setLong(v);
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
      <Divider />
      <MapComp lat={lat} long={long} updateParent={updateParent} />
      <Divider />
      <Segment basic>
        <p>Latitude</p>
        <InputNumber
          min={0}
          step={0.0000001}
          value={lat}
          onChange={onChangeLat}
        />
        <Divider />
        <p>Longitude</p>
        <InputNumber
          min={0}
          step={0.0000001}
          value={long}
          onChange={onChangeLng}
        />
      </Segment>
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

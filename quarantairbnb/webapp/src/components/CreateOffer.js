import React, { useState } from "react";
import { Alert, Input, Form, DatePicker, Button, InputNumber } from "antd";
import { postFromBody } from "../actions";
import * as at from "../actions/types";
import { connect } from "react-redux";
import MapComp from "./MapComp";
import { Segment, Header, Divider } from "semantic-ui-react";



const CreateOffer = ({ postRequest, fetchOffers, setLoading }) => {
  const [lat, setLat] = useState(52.231838);
  const [long, setLong] = useState(21.0038063);
  const updateParent = (mapLat, mapLong) => {
    setLat(mapLat);
    setLong(mapLong);
  };
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
      number_of_rooms: values.numberOfRooms,
      area: values.area
    };
    await postRequest(body);
    await fetchOffers();
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
        message="Tell us about your place"
        description="Provide all the details that you think can be relevant for a person in need. Thank you for making the world a better place!"
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
        <Form.Item
          name="numberOfRooms"
          label="Number of rooms"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
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

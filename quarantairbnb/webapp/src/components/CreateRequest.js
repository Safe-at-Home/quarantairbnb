import React, { useState } from "react";
import { Alert, Input, Form, DatePicker, Button, InputNumber } from "antd";
import { postFromBody } from "../actions";
import * as at from "../actions/types";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Segment, Header, Divider } from "semantic-ui-react";

const MapThing = ({ lat, long }) => {
  const [activePark, setActivePark] = React.useState(null);

  if (isNaN(lat) || isNaN(long)) {
    return (
      <Segment>
        <Header>Cannot render map</Header>
      </Segment>
    );
  }

  return (
    <Map style={{ height: "350px" }} center={[lat, long, 17]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        key={"center"}
        position={[lat, long]}
        // onClick={() => {
        //   setActivePark(park);
        // }}
        // icon={icon}
      />
      {/* 
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0]
          ]}
          onClick={() => {
            setActivePark(park);
          }}
          icon={icon}
        />
      ))}

      {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0]
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )} */}
    </Map>
  );
};

const CreateRequest = ({ postRequest, fetchRequests, setLoading }) => {
  const [lat, setLat] = useState(52.231838);
  const [long, setLong] = useState(21.0038063);
  const onFinish = async (values) => {
    console.log(values);
    // we should build a body here and submit
    setLoading(true);
    const body = {
      description: values.description,
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
      <MapThing lat={lat} long={long} />
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

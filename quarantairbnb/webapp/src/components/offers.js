import {Card, Col, Layout, Row, Button} from "antd";
import React from "react";

const Offers = () => (
  <Layout.Content>
    <Row justify="center" type="flex" align="middle" className="full-page-layout">
      <Col span={22}>
        <Card>
          <Offer offerCreated={true}/>
        </Card>
      </Col>
    </Row>
  </Layout.Content>
);

const Offer = (props) => {
  if (props.offerCreated) return AddNewOffer(props);
  else return ViewYourOffer(props);
};

const AddNewOffer = (props) => (
  <Row justify="center" type="flex" align="middle" className="full-page-layout">
    <Col span={6}>
      <Card>
        <Row justify="center" type="flex" align="middle">
          You haven't submitted an offer yet
        </Row>
        <Row justify="center" type="flex" align="middle">
          <Button>Add</Button>
        </Row>
      </Card>
    </Col>
  </Row>
);

const ViewYourOffer = (props) => (
  <Row justify="center" type="flex" align="middle" className="full-page-layout">
    <Col span={6}>
      <Card>
        <Row justify="center" type="flex" align="middle">
          You haven't submitted an offer yet
        </Row>
        <Row justify="center" type="flex" align="middle">
          <Button>Add</Button>
        </Row>
      </Card>
    </Col>
  </Row>
);

export default Offers;
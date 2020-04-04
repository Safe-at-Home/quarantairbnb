import {Card, Col, Layout, Row, Button} from "antd";
import React from "react";

const Offers = () => (
  <Layout.Content>
    <Row justify="center" type="flex" align="middle" className="full-page-layout">
      <Col span={22}>
        <Card>
          <AddNewOffer/>
        </Card>
      </Col>
    </Row>
  </Layout.Content>
);

const AddNewOffer = () => (
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
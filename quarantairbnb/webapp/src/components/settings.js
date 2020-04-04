import {Card, Col, Layout, Row} from "antd";
import React from "react";

const Settings = () => (
  <Layout.Content>
    <Row justify="center" type="flex" align="middle" className="full-page-layout">
      <Col span={22}>
        <Card>
          <ProfileHeader photo="photo" name="firstname lastname"/>
          <Setting settingName="Password">
            <Col span={22}>
              <input/>
            </Col>
          </Setting>
        </Card>
      </Col>
    </Row>
  </Layout.Content>
);

const JustifiedCentrallyAlignedRow = (props) => (
  <Row justify="center" type="flex" align="middle">
    {props.children}
  </Row>
);

const CentrallyAlignedRow = (props) => (
  <Row type="flex" align="middle">
    {props.children}
  </Row>
);

const ProfileHeader = (props) => (
  <JustifiedCentrallyAlignedRow>
    <Col offset={4} span={1}>
      <CentrallyAlignedRow>
        {props.photo}
      </CentrallyAlignedRow>
    </Col>
    <Col span={7}>
      <CentrallyAlignedRow>
        <b>{props.name}</b>
      </CentrallyAlignedRow>
    </Col>
  </JustifiedCentrallyAlignedRow>
);

const Setting = (props) => (
  <JustifiedCentrallyAlignedRow>
    <Col span={1}>
      <b>{props.settingName}</b>
    </Col>
    <Col span={9}>
      <JustifiedCentrallyAlignedRow>
        {props.children}
      </JustifiedCentrallyAlignedRow>
    </Col>
  </JustifiedCentrallyAlignedRow>
);

export default Settings;
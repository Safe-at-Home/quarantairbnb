import React from "react";
import {
  SectionsContainer,
  Section,
  ScrollToTopOnMount
} from "react-fullpage";
import { Row, Col, Button } from "antd";

function StartingScreen() {
  return (
    <>
      <ScrollToTopOnMount />
      <SectionsContainer
        anchors={["welcome", "guest", "host"]}
        verticalAlign={true}
        sectionPaddingTop="64px"
      >
        <Section>
          <WelcomeScreen />
        </Section>
        <Section>
          <GuestScreen />
        </Section>
        <Section>
          <HostScreen />
        </Section>
      </SectionsContainer>
    </>
  );
}

const WelcomeScreen = () => (
  <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
    <Row>
      <Col span={12}>
        <h1>Quarantine is hard for everyone</h1>
        <h4>
          But for some even harder. <br />
          We'll help you find a safe place to stay if you're in need.
        </h4>
      </Col>
      <Col span={12}>
        <div>
          <a href="#guest">I need a place to stay</a>
        </div>
        <div>
          <a href="#host">I can offer a place to stay</a>
        </div>
      </Col>
    </Row>
  </div>
);

const GuestScreen = () => (
  <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
    <Row>
      <Col span={12}>
        <h1>I need a safe place</h1>
        <h4>
          If you are a victim of domestic violence or any other kind of abuse,
          don't be afraid to ask for help.
        </h4>
      </Col>
      <Col span={12}>
        <Button>Sign up as a guest</Button>
      </Col>
    </Row>
  </div>
);

const HostScreen = () => (
  <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
    <Row>
      <Col span={12}>
        <h1>I can offer a place</h1>
        <h4>
          If you are an owner of an institution or company that could safely
          host people in need, we will help you get in touch with those who
          truly need it.
        </h4>
      </Col>
      <Col span={12}>
        <Button>Sign up as a host</Button>
      </Col>
    </Row>
  </div>
);

export default StartingScreen;

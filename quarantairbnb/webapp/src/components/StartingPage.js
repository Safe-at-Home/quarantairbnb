import React from "react";
import { Layout, Menu, Row,Col } from "antd";
import StartingScreen from "./StartingScreen";
import Header from "react-fullpage/dist/Header";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

function LandingPage() {
  return (
    <Layout style={{
        background: "#001529",
        padding: 24,
        minHeight: 280,
        height: "80vh",
      }}>
      <Layout.Content>
        <StartingScreen />
      </Layout.Content>
    </Layout>
  );
}

export default withRouter(LandingPage);

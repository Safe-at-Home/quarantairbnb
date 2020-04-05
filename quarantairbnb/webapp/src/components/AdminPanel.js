import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Messages, { ModeratorMessages } from "./messages";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import RequestManagement from "./RequestManagement";
import ModeratorRequests from "./ModeratorRequests";
import ModeratorOffers from "./ModeratorOffers";

const AdminPanel = ({ authorized, role }) => {
  const [screen, setScreen] = useState("pending-requests");
  return (
    <>
      {authorized ? (
        <>
          {role === "admin" ? (
            <Layout style={{ minHeight: "100vh" }}>
              <Layout.Sider>
                <div style={{ padding: "20px 0 0 20px" }}>
                  <h1 style={{ color: "#eee" }}>Safe at Home</h1>
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  onClick={(value) => setScreen(value.key)}
                  selectedKeys={[screen]}
                >
                  <Menu.Item key="pending-requests">Pending request</Menu.Item>
                  <Menu.Item key="pending-offers">Pending offers</Menu.Item>
                </Menu>
              </Layout.Sider>
              {screen === "pending-requests" && <ModeratorRequests />}
              {screen === "pending-offers" && <ModeratorOffers />}
            </Layout>
          ) : (
            <Redirect to={{ pathname: `/${role}` }} />
          )}
        </>
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
  role: state.auth.role,
});

export default connect(mapStateToProps)(AdminPanel);

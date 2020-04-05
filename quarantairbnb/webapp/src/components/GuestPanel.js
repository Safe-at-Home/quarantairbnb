import { Layout, Menu } from "antd";
import Messages, { ModeratorMessages } from "./messages";
import { Redirect } from "react-router";
import React, { useState } from "react";
import { connect } from "react-redux";

import RequestManagement from "./RequestManagement";

function GuestPanel({ authorized, role }) {
  const [screen, setScreen] = useState("request");
  return (
    <>
      {authorized ? (
        <>
          {role === "guest" ? (
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
                  <Menu.Item key="request">Your Request</Menu.Item>
                  <Menu.Item key="messages">My messages</Menu.Item>
                  <Menu.Item key="mod-messages">Contact moderator</Menu.Item>
                </Menu>
              </Layout.Sider>
              {screen === "request" ? (
                <RequestManagement />
              ) : (
                <>
                  {screen === "messages" ? <Messages /> : <ModeratorMessages />}
                </>
              )}
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
}

const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
  role: state.auth.role,
});

export default connect(mapStateToProps)(GuestPanel);

import { Layout, Menu } from "antd";
import Offers from "./offers";
import Messages, { ModeratorMessages } from "./messages";
import Settings from "./settings";
import React, { useState } from "react";
import { HostMenu, ProgressBar, Sidebar } from "./userPanel";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import OffersList from "./OffersList";

function HostPanel({ authorized, role, offers }) {
  const [screen, setScreen] = useState("request");

  return (
    <>
      {authorized ? (
        <>
          {role === "host" ? (
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
              <Layout>
                {screen === "request" ? (
                  <OffersList />
                ) : (
                  <>
                    {screen === "messages" ? (
                      <Messages />
                    ) : (
                      <ModeratorMessages />
                    )}
                  </>
                )}
              </Layout>
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
  offers: state.offers,
});
export default connect(mapStateToProps)(HostPanel);

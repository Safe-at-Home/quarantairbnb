import {Layout} from "antd";
import Offers from "./offers";
import Messages, {ModeratorMessages} from "./messages";
import Settings from "./settings";
import React from "react";
import {HostMenu, ProgressBar, Sidebar} from "./userPanel";
import {withRouter} from "react-router";
import {Route} from "react-router-dom";

function HostPanel() {
  return (
    <Layout className="full-page-layout">
      <Sidebar>
        <HostMenu/>
      </Sidebar>
      <Layout>
        <ProgressBar
          stepNames={['Request help', 'Wait for the moderator\'s approval', 'Wait for a match', 'Chat with your match', 'All done!']}
          currentStepIndex={1}/>
        <Route path="/host/offers" component={Offers}/>
        <Route path="/host/messages" component={Messages}/>
        <Route path="/host/settings" component={Settings}/>
        <Route path="/host/moderatormessages" component={ModeratorMessages}/>
      </Layout>
    </Layout>
  )
}

export default withRouter(HostPanel)
import {Layout} from "antd";
import Offers from "./offers";
import Messages, {ModeratorMessages} from "./messages";
import Settings from "./settings";
import {GuestMenu, ProgressBar, Sidebar} from "./userPanel";
import {withRouter} from "react-router";
import React from "react";
import {Route} from "react-router-dom";

function GuestPanel() {
  return (
    <div>
      <Layout className="full-page-layout">
        <Sidebar>
          <GuestMenu/>
        </Sidebar>
        <Layout>
          <ProgressBar
            stepNames={['Request help', 'Wait for the moderator\'s approval', 'Wait for a match', 'Chat with your match', 'All done!']}
            currentStepIndex={1}/>
          <Route path="/guest/offers" component={Offers}/>
          <Route path="/guest/messages" component={Messages}/>
          <Route path="/guest/settings" component={Settings}/>
          <Route path="/guest/moderatormessages" component={ModeratorMessages}/>
        </Layout>
      </Layout>
    </div>

  )
}

export default withRouter(GuestPanel);
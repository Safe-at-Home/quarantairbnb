import React, { useEffect, useState } from "react";
import { Spin, Layout } from "antd";
import CreateRequest from "./CreateRequest";
import ReviewRequest from "./ReviewRequest";
import WaitForOffer from "./WaitForOffer";
import { connect } from "react-redux";
import { ProgressBar } from "./userPanel";
import { getAll } from "../actions";
import * as at from "../actions/types";
import MatchedOffer from "./MatchedOffer";
import ConfirmedOffer from "./ConfirmedOffer";

const RequestManagement = ({ requests, fetchRequests }) => {
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
    await fetchRequests();
    setLoading(false);
  };
  const getCurrentStepIndex = () => {
    if (!requests.state_id) {
      return 0;
    }
    return requests.state_id;
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <Spin spinning={loading} style={{ width: "100%" }}>
        <Layout>
          <ProgressBar
            stepNames={[
              "Request help",
              "Wait for the moderator's approval",
              "Wait for a match",
              "Chat with your match",
              "All done!",
            ]}
            currentStepIndex={getCurrentStepIndex()}
          />
          <div
            className="site-layout-content"
            style={{
              margin: "50px",
              padding: "30px",
              minHeight: "75vh",
              backgroundColor: "#fff",
            }}
          >
            {getCurrentStepIndex() === 0 ? (
              <CreateRequest
                fetchRequests={fetchRequests}
                setLoading={setLoading}
              />
            ) : (
              <>
                {getCurrentStepIndex() === 1 ? (
                  <ReviewRequest
                    fetchRequests={fetchRequests}
                    setLoading={setLoading}
                  />
                ) : (
                  <>
                    {getCurrentStepIndex() === 2 ? (
                      <WaitForOffer
                        fetchRequests={fetchRequests}
                        setLoading={setLoading}
                      />
                    ) : (
                      <>
                        {getCurrentStepIndex() === 3 ? (
                          <MatchedOffer
                            fetchRequests={fetchRequests}
                            setLoading={setLoading}
                          />
                        ) : (
                          <ConfirmedOffer
                            fetchRequests={fetchRequests}
                            setLoading={setLoading}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Layout>
      </Spin>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  requests: state.requests,
});

const fetchRequests = () => async (dispatch) => {
  await dispatch(getAll(at.REQUESTS));
};

export default connect(mapStateToProps, { fetchRequests })(RequestManagement);

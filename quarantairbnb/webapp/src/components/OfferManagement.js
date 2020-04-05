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
import _ from "lodash";
import CreateOffer from "./CreateOffer";

const OfferManagement = ({ isNew, offerId, offers, fetchOffers }) => {
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    await fetchOffers();
    setLoading(false);
  };
  const getCurrentStepIndex = () => {
    if (isNew || !offerId) {
      return 0;
    }
    return _.filter(offers, (o) => o.id === offerId)[0].state_id;
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
              "Offer a place",
              "Wait for the moderator's approval",
              "Wait for a match",
              "Chat with your match",
              "Done",
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
              <CreateOffer fetchOffers={fetchOffers} setLoading={setLoading} />
            ) : (
              <>
                {/*
                from here on these components should be 
                replaced, they're just copied from the guest
                */
               getCurrentStepIndex() === 1 || getCurrentStepIndex() === 2 ? (
                  <ReviewRequest
                    fetchOffers={fetchOffers}
                    setLoading={setLoading}
                  />
                ) : (
                  <>
                    {getCurrentStepIndex() === 3 ? (
                      <WaitForOffer
                        fetchOffers={fetchOffers}
                        setLoading={setLoading}
                      />
                    ) : (
                      <>
                        {getCurrentStepIndex() === 4 ? (
                          <MatchedOffer
                            fetchOffers={fetchOffers}
                            setLoading={setLoading}
                          />
                        ) : (
                          <ConfirmedOffer
                            fetchOffers={fetchOffers}
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
  offers: state.offers,
});

const fetchOffers = () => async (dispatch) => {
  await dispatch(getAll(at.OFFERS));
};

export default connect(mapStateToProps, { fetchOffers })(OfferManagement);

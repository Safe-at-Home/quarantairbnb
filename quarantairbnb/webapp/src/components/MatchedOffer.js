import React, { useEffect } from "react";
import { Alert, Button } from "antd";
import * as at from "../actions/types";
import { connect } from "react-redux";
import { postOperation, getAll } from "../actions";

const MatchedOffer = ({
  postOperationRequest,
  fetchRequests,
  setLoading,
  requestId,
  offerId,
  getOfferDetails,
}) => {
  const loadData = async () => {
    setLoading(true);
    await getOfferDetails();
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  const accept = async () => {
    setLoading(true);
    await postOperationRequest("accept", requestId);
    await fetchRequests();
    setLoading(false);
  };
  return (
    <>
      <Alert
        message="You got a match!"
        description="If you have any doubts, you can always talk to the host or the moderator."
        type="info"
        showIcon
        closable
        style={{ marginBottom: "20px" }}
      />
      <h1>Accept your match!</h1>
      <p>Here some offer details...</p>
      <Button onClick={accept}>Accept offer</Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  requestId: state.requests.id,
  offerId: state.requests.offer_id,
  // some offer details
});
const postOperationRequest = (operation, id) => async (dispatch) => {
  await dispatch(postOperation(at.REQUESTS, operation, id));
};
const getOfferDetails = (id) => async (dispatch) => {
  await dispatch(getAll(at.OFFERS));
};
export default connect(mapStateToProps, {
  postOperationRequest,
  getOfferDetails,
})(MatchedOffer);

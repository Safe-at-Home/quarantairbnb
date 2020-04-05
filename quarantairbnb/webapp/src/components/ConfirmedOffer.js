import React, { useEffect } from "react";
import { Alert, Button } from "antd";
import * as at from "../actions/types";
import { connect } from "react-redux";
import { postOperation, getAll } from "../actions";

const ConfirmedOffer = ({ setLoading, getOfferDetails }) => {
  const getData = async () => {
    setLoading(true);
    await getOfferDetails();
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Alert
        message="All confirmed!"
        description="Below you'll find all the details. Remember, you can always contact your host!"
        type="info"
        showIcon
        closable
        style={{ marginBottom: "20px" }}
      />
      <p>Here some offer details...</p>
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
})(ConfirmedOffer);

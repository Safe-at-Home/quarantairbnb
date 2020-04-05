import React from "react";
import { Alert, Button } from "antd";
import * as at from "../actions/types";
import { connect } from "react-redux";
import { postOperation } from "../actions";

const ReviewRequest = ({ postOperationRequest, fetchRequests, setLoading, request }) => {
  const deleteRequest = async () => {
    setLoading(true);
    await postOperationRequest("delete", request.id);
    await fetchRequests();
    setLoading(false);
  };
  return (
    <>
      <Alert
        message="Your request has been submitted"
        description="We'll take a look at it soon! In the meantime, you can review it and edit."
        type="info"
        showIcon
        closable
        style={{ marginBottom: "20px" }}
      />
      <h1>Review your request</h1>
      <Button onClick={deleteRequest}>Delete</Button>

    </>
  );
};

const mapStateToProps = state => ({
  request: state.requests
})
const postOperationRequest = (operation, id) => async (dispatch) => {
  await dispatch(postOperation(at.REQUESTS, operation, id));
};
export default connect(mapStateToProps, { postOperationRequest })(ReviewRequest);

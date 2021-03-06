import React, { useEffect, useState } from "react";
import { Spin, Layout, Table } from "antd";
import CreateRequest from "./CreateRequest";
import ReviewRequest from "./ReviewRequest";
import WaitForOffer from "./WaitForOffer";
import { connect } from "react-redux";
import { ProgressBar } from "./userPanel";
import { getAll, postOperation } from "../actions";
import * as at from "../actions/types";
import MatchedOffer from "./MatchedOffer";
import ConfirmedOffer from "./ConfirmedOffer";
import { Button } from "semantic-ui-react";

const ModeratorOffers = ({ fetchRequests }) => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const getData = async () => {
    setLoading(true);
    const fetched = await fetchRequests();
    setRequests(fetched);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [setRequests]);


  const accept = async (row) => {
    console.log(row);
    await postOperationRequest("accept", row.id);
    await getData();
  }

  const reject = async (row) => {
    console.log('rejecting', row);
    await postOperationRequest("cancel", row.id);
    await getData();
  }


  console.log(requests);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (s) => s.name,
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (d, row) => (
        <>
          <Button onClick={() => accept(row)} primary>
            Accept
          </Button>
          <Button onClick={() => reject(row)}>
            Reject
          </Button>
        </>
      )
    }
  ];

  return (
    <Layout>
      <Spin spinning={loading} style={{ width: "100%" }}>
        <Layout>
          <div
            className="site-layout-content"
            style={{
              margin: "50px",
              padding: "30px",
              minHeight: "75vh",
              backgroundColor: "#fff",
            }}
          >
            <Table dataSource={requests} columns={columns} />;
          </div>
        </Layout>
      </Spin>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  //   requests: state.requests,
});

const fetchRequests = () => async (dispatch) =>
  await dispatch(getAll(at.MOD_OFFERS));

const postOperationRequest = (operation, id) => async (dispatch) =>
  await dispatch(postOperation(at.OFFERS, operation, id));

export default connect(mapStateToProps, { fetchRequests, postOperationRequest })(ModeratorOffers);

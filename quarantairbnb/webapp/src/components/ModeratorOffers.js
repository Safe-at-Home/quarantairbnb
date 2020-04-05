import React, { useEffect, useState } from "react";
import { Spin, Layout, Table } from "antd";
import CreateRequest from "./CreateRequest";
import ReviewRequest from "./ReviewRequest";
import WaitForOffer from "./WaitForOffer";
import { connect } from "react-redux";
import { ProgressBar } from "./userPanel";
import { getAll } from "../actions";
import * as at from "../actions/types";
import MatchedOffer from "./MatchedOffer";
import ConfirmedOffer from "./ConfirmedOffer";

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

  console.log(requests);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
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

export default connect(mapStateToProps, { fetchRequests })(ModeratorOffers);

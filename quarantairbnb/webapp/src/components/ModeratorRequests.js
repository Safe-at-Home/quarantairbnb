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
import { Segment, Container } from "semantic-ui-react";
const ModeratorRequests = ({ fetchRequests }) => {
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
  ];

  return (
    <Layout>
      <Spin spinning={loading} style={{ width: "100%" }}>
        <Layout>
          <Container>
            <Segment>
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
            </Segment>
          </Container>
        </Layout>
      </Spin>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  //   requests: state.requests,
});

const fetchRequests = () => async (dispatch) =>
  await dispatch(getAll(at.MOD_REQUESTS));

export default connect(mapStateToProps, { fetchRequests })(ModeratorRequests);

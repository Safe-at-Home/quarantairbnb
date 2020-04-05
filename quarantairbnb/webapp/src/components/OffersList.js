import React, { useState, useEffect } from "react";
import { Layout, Spin, Empty, Button } from "antd";
import { connect } from "react-redux";
import { getAll } from "../actions";
import * as at from "../actions/types";
import OfferManagement from "./OfferManagement";

const OffersList = ({ fetchOffers, offers }) => {
  const [loading, setLoading] = useState(true);
  const [offerId, setOfferId] = useState(undefined);
  const [browse, setBrowse] = useState(true);
  const [newOffer, setNewOffer] = useState(false);
  const getData = async () => {
    setLoading(true);
    await fetchOffers();
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const addNew = () => {
    setBrowse(false);
    setNewOffer(true);
  };
  return (
    <Layout>
      <Spin spinning={loading}>
        <Layout>
          <div
            style={{
              margin: "50px",
              padding: "30px",
              backgroundColor: "#fff",
            }}
          >
            {browse ? (
                <>
                <h1>Manage all your offers</h1>
                {offers.length === 0 && (
                  <Empty
                    description={<span>No offers yet</span>}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
                {/*otherwise, add a list*/}
                <Button size="small" onClick={addNew}>
                  Add new offer
                </Button>
              </>
            ) : <Button onClick={() => setBrowse(true)}>Manage all your offers</Button>}
          </div>
          {newOffer ? (
            <OfferManagement isNew={true} />
          ) : (
            <>{offerId && <OfferManagement offerId={offerId} />}</>
          )}
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

export default connect(mapStateToProps, { fetchOffers })(OffersList);

import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Segment, Header, Divider } from "semantic-ui-react";

const MapComp = ({ lat, long, updateParent }) => {
  const [initialLocation, setLocation] = React.useState([lat, long]);

  if (isNaN(lat) || isNaN(long)) {
    return (
      <Segment>
        <Header>Cannot render map</Header>
      </Segment>
    );
  }

  const addMarker = (e) => {
    console.log(e)
    if (e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
      updateParent(e.latlng.lat, e.latlng.lng);
    }

  }


  return (
    <Map style={{ height: "350px" }} center={[initialLocation[0], initialLocation[1], 17]} zoom={12} onClick={addMarker}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        key={"center"}
        position={initialLocation}
      >
        <Popup>
          <span>Currently selected location</span>
        </Popup>
      </Marker>
    </Map>
  );
};

export default MapComp

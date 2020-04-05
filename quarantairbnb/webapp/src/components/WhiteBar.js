import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Segment,
  Menu,
  Button,
  Image,
  Grid,
  Icon,
  Divider,
} from "semantic-ui-react";
import { withRouter } from "react-router";

function WhiteBar() {
  const fixed = false;

  return (
    <Segment textAlign="center" style={{ padding: "1em 0em", backgroundColor: "#fff" }} vertical basic>
      <Menu
        fixed={fixed ? "top" : null}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Menu.Item>
            <Image src="logo.png" size="mini" centered />
            <Link to={"/"}>
              <h3>Safe at Home</h3>
            </Link>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
}

export default withRouter(WhiteBar);

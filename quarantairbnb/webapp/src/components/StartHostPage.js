import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
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
function StartHostPage() {
  const fixed = false;
  return (
    <>
      <Segment textAlign="center" style={{ padding: "1em 0em" }} vertical basic>
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
            <Menu.Item position="right">
              <Link to={"/login"}>
                <Button as="a">Log in</Button>
              </Link>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      <HomepageHeading />
    </>
  );
}
function HomepageHeading() {
  return (
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
         Quarantine is hard.
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          But for some is even harder. If you're an owner of a facility that can temporarily share rooms with those in need, join us to spread the good.
        </p>
        <Link to={"/registerHost"}>
          <Button as="a" size="large">
            Register as a Host
          </Button>
        </Link>
      </Container>
    </Segment>
  );
}

export default withRouter(StartHostPage);

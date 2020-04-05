import React from "react";
import StartingScreen from "./StartingScreen";
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
function LandingPage() {
  const fixed = false;
  return (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{ padding: "1em 0em" }}
        vertical
      >
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item position="right">
              <Link to={"/login"}>
                <Button as="a" inverted={!fixed}>
                  Log in
                </Button>
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
    <Container>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Image
              src="logo.png"
              size="small"
              centered
              style={{ marginTop: "30px" }}
            />
            <Header
              as="h1"
              content="Safe at Home"
              style={{
                fontSize: "4em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: 0,
              }}
            ></Header>
            <Header
              as="h2"
              content="Who are you?"
              style={{
                fontSize: "1.7em",
                fontWeight: "normal",
                marginTop: 0,
              }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Guest
              </Header>
              <p style={{ fontSize: "1.33em" }}>I seek a place to stay</p>
              <Link to={"/startGuest"}>
                <Button secondary size="huge">
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Host
              </Header>
              <p style={{ fontSize: "1.33em" }}>I can offer a safe place</p>
              <Link to={"/startHost"}>
                <Button secondary size="huge">
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
}

export default withRouter(LandingPage);

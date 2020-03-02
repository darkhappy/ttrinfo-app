import React, { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Navbar.Brand>Toontown Rewritten Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/" exact>
            <Nav.Link>All</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/inv">
            <Nav.Link>Invasions</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/pop">
            <Nav.Link>Population</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/silly">
            <Nav.Link>Silly Meter</Nav.Link>
          </LinkContainer>
          <Nav.Link disabled>Settings</Nav.Link>
        </Nav>
        <Navbar.Text>
          {this.props.version} |{" "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={this.props.refresh}
          >
            {this.props.lastUpdate}
          </Button>
        </Navbar.Text>
      </Navbar>
    );
  }
}

export default NavBar;

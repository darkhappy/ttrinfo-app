import React, { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light" fixed="bottom">
        <Navbar.Brand href="/">Toontown Rewritten Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>All</Nav.Link>
          <Nav.Link>Invasions</Nav.Link>
          <Nav.Link>Population</Nav.Link>
          <Nav.Link>Silly Meter</Nav.Link>
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

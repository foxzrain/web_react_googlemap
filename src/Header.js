import React, { Component } from 'react';
import { Navbar, Form, FormControl, Button } from "react-bootstrap";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
        };
    }

  handleSearchInput = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit = () => {
    if (this.state.searchText) {
        alert(this.state.searchText);
    } else {
      alert("Please enter some search text!");
    }
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" sticky='top' style={{justifyContent: 'end'}}>
            <Form style={{width: '100%', display: 'contents'}}>
                <FormControl
                onChange={this.handleSearchInput}
                value={this.state.searchText}
                type="text"
                placeholder="Search"
                style={{width: '50%', marginRight: '1rem'}}
                />
                <Button onClick={this.handleSearchSubmit} variant="outline-info">
                Search
                </Button>
            </Form>
        </Navbar>
      </>
    );
  }
}

export default Header;
import React, { Component } from "react";

// Components
import Navbar from "../components/Navigation/Navbar/Navbar";
import Sidebar from "../components/Navigation/Sidebar/Sidebar";

class Layout extends Component {
  state = {
    isSidebarOpen: false,
  };

  closeSidebar = () => {
    this.setState({ isSidebarOpen: false });
  };

  toggleSidebar = () => {
    this.setState((prev) => {
      return { isSidebarOpen: !prev.isSidebarOpen };
    });
  };

  render() {
    return (
      <div>
        <Navbar toggle={this.toggleSidebar} open={this.state.isSidebarOpen} />
        <Sidebar open={this.state.isSidebarOpen} close={this.closeSidebar} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;

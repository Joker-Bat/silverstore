import React, { Component } from "react";

// Components
import Navbar from "../components/Navigation/Navbar/Navbar";
import Sidebar from "../components/Navigation/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

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
        <Navbar
          toggle={this.toggleSidebar}
          open={this.state.isSidebarOpen}
          close={this.closeSidebar}
        />
        <Sidebar open={this.state.isSidebarOpen} close={this.closeSidebar} />
        <main style={{ minHeight: "200vh", paddingTop: "12rem" }}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;

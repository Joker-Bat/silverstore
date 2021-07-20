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
      <>
        <Navbar
          toggle={this.toggleSidebar}
          open={this.state.isSidebarOpen}
          close={this.closeSidebar}
        />
        <Sidebar open={this.state.isSidebarOpen} close={this.closeSidebar} />
        <main style={{paddingTop: '10rem', minHeight: '100vh'}}>
          {this.props.children}
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;

import React from "react";

// Styles
import classes from "./Sidebar.module.scss";

// Components
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidebar = (props) => {
  const sidebarClasses = [classes.Sidebar];

  if (props.open) {
    sidebarClasses.push(classes.Open);
  }
  return (
    <>
      <Backdrop isOpen={props.open} close={props.close} />
      <aside className={sidebarClasses.join(" ")}>
        <NavigationItems closeBackdrop={props.close} />
      </aside>
    </>
  );
};

export default Sidebar;

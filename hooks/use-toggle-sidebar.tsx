import React from "react";

export default function useToggleSidebar() {
  const [toggleDrawer, setToggleDrawer] = React.useState<boolean>(true);

  function handleToggleDrawer() {
    setToggleDrawer((prev) => !prev);
  }

  return {
    isToggle: toggleDrawer,
    setToggle: setToggleDrawer,
    handleToggle: handleToggleDrawer,
  };
}

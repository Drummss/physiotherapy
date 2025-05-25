import { type PropsWithChildren, useMemo } from "react";
import { Link, useLocation } from "react-router";

import { Button } from "@mui/material";

export const NavButton = ({
  children,
  to,
}: PropsWithChildren<{ to: string }>) => {
  const location = useLocation();

  const isActive = useMemo(() => {
    const destinationUri: string = to.startsWith("/") ? to : `/${to}`;

    if (
      destinationUri === location.pathname ||
      (destinationUri !== "/" && location.pathname.startsWith(destinationUri))
    ) {
      return true;
    }

    return false;
  }, [to, location]);

  return (
    <Button
      component={Link}
      variant={isActive ? "contained" : "outlined"}
      to={to}
    >
      {children}
    </Button>
  );
};

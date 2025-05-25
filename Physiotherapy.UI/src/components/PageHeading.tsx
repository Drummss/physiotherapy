import type { PropsWithChildren } from "react";

import { Typography, type TypographyProps } from "@mui/material";

export type PageHeadingProps = PropsWithChildren<TypographyProps>;

export const PageHeading = (props: PageHeadingProps) => {
  const { children, ...rest } = props;

  return (
    <Typography fontSize="1.8rem" fontWeight="400" mb="1rem" {...rest}>
      {children}
    </Typography>
  );
};

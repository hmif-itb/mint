import React, { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import Box from '@material-ui/core/Box/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

interface MyProps {
  children: ReactNode;
  centerOnMobile?: boolean;
}

export default (props: MyProps) => {
  const theme = useTheme();
  const shouldCenter = props.centerOnMobile || !useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      style={{ minHeight: shouldCenter ? '100vh' : undefined }}
      pt={3}
      pb={3}
    >
      <Box>{props.children}</Box>
    </Box>
  );
};

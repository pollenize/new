import PropTypes from 'prop-types';
import React from 'react';
import {Box, Grid, Typography} from '@material-ui/core';
import {HEADER_HEIGHT} from './header-base';
import {styled, useTheme} from '@material-ui/styles';

export const PageAnchor = styled('a')({
  display: 'block',
  height: HEADER_HEIGHT,
  marginTop: -HEADER_HEIGHT
});

export function SectionWrapper(props) {
  const {breakpoints} = useTheme();
  return <Box maxWidth={breakpoints.values.lg} mx="auto" p={8} {...props} />;
}

const contentWrapperPaddingRightXs = 5;
const contentWrapperPaddingRightLg = 8;
const contentWrapperPaddingDelta =
  contentWrapperPaddingRightLg - contentWrapperPaddingRightXs;

export function ContentWrapper(props) {
  return (
    <Box
      py={{
        xs: 5,
        lg: 7
      }}
      pr={{
        xs: contentWrapperPaddingRightXs,
        lg: contentWrapperPaddingRightLg
      }}
      pl={{
        xs: 5,
        md: 0
      }}
      {...props}
    />
  );
}

export function PageWrapper(props) {
  const {breakpoints, spacing} = useTheme();
  const {lg} = breakpoints.values;
  return (
    <Box
      maxWidth={{
        md: lg - spacing(contentWrapperPaddingDelta * 2),
        lg
      }}
      mx="auto"
    >
      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          {props.sidebar}
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
}

PageWrapper.propTypes = {
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export function PageHeader({children, title, subtitle, ...props}) {
  return (
    <Box
      p={{
        xs: 5,
        md: 7
      }}
      textAlign="center"
      {...props}
    >
      {children}
      <Typography paragraph variant="h3">
        {title}
      </Typography>
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
    </Box>
  );
}

PageHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

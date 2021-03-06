import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Box, Grid, Typography} from '@material-ui/core';
import {Link} from 'gatsby-theme-material-ui';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {SectionWrapper} from './common';
import {withProps} from 'recompose';

function NavGroup(props) {
  return (
    <Grid item>
      <Box display="flex" flexDirection="column">
        <Typography gutterBottom variant="button">
          {props.title}
        </Typography>
        {props.children}
      </Box>
    </Grid>
  );
}

NavGroup.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

const FooterLink = withProps({
  gutterBottom: true,
  color: 'inherit'
})(Link);

export function FooterContent() {
  return (
    <Fragment>
      <Grid container spacing={4} justify="space-between">
        <Grid item xs={12} md="auto">
          <Box display="flex" alignItems="center" mb={2}>
            <Logo height={24} fill="currentColor" style={{marginRight: 12}} />
            <Typography variant="caption">
              Informing voters since 2014
            </Typography>
          </Box>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Really Awesome Doings
          </Typography>
        </Grid>
        <NavGroup title="Quick links">
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/elections">Elections</FooterLink>
          <FooterLink to="/team">Team</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </NavGroup>
        <NavGroup title="Follow us">
          <FooterLink href="https://twitter.com/pollenizeorg">
            Twitter
          </FooterLink>
          <FooterLink href="https://instagram.com/pollenize">
            Instagram
          </FooterLink>
          <FooterLink href="https://facebook.com/pollenize">
            Facebook
          </FooterLink>
        </NavGroup>
        <NavGroup title="Other">
          <FooterLink href="mailto:info@pollenize.org">Contact us</FooterLink>
          <FooterLink href="https://github.com/trevorblades/pollenize">
            Source code
          </FooterLink>
        </NavGroup>
      </Grid>
    </Fragment>
  );
}

export default function Footer() {
  return (
    <SectionWrapper color="text.secondary">
      <FooterContent />
    </SectionWrapper>
  );
}

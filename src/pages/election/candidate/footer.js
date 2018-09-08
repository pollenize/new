import CivixQuebecLogo from '../../../assets/logos/civix-quebec.svg';
import LavalLogo from '../../../assets/logos/laval.svg';
import LogoWithWordmark from '../../../components/logo-with-wordmark';
import React from 'react';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../../theme';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import {footerClassName} from '../../../components/footer';
import {size} from 'polished';

const Container = styled.footer(footerClassName);
const InnerContainer = styled(Section)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const Text = withProps({
  color: 'inherit',
  variant: 'subheading'
})(Typography);

const Logos = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: 48
});

const TargetBlankAnchor = defaultProps({
  target: '_blank',
  rel: 'noopener noreferrer'
})('a');

const StyledAnchor = styled(TargetBlankAnchor)({
  maxWidth: 120,
  maxHeight: 48,
  svg: {
    display: 'block',
    ...size('100%'),
    fill: 'currentColor'
  }
});

const X = withProps({
  children: 'x',
  color: 'inherit',
  variant: 'subheading'
})(
  styled(Typography)({
    margin: `0 ${theme.spacing.unit * 3}px`
  })
);

const Footer = () => (
  <Container>
    <InnerContainer centered>
      <Text>Un projet de</Text>
      <Text>en partenariat avec</Text>
      <Logos>
        <StyledAnchor href="https://civix.quebec" title="CIVIX-Québec">
          <CivixQuebecLogo />
        </StyledAnchor>
        <X />
        <TargetBlankAnchor href="https://pollenize.org">
          <LogoWithWordmark height={32} />
        </TargetBlankAnchor>
        <X />
        <StyledAnchor href="https://ulaval.ca" title="Université Laval">
          <LavalLogo />
        </StyledAnchor>
      </Logos>
    </InnerContainer>
  </Container>
);

export default Footer;

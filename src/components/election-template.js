import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Avatar, CardActionArea, Grid, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {Link, graphql} from 'gatsby';
import {cover, size} from 'polished';
import {makeStyles, styled, useTheme} from '@material-ui/styles';
import {useLanguage} from '../utils/language';

const Wrapper = styled('div')({
  ...cover(),
  display: 'flex',
  flexDirection: 'column'
});

const StyledGrid = styled(Grid)({
  flexGrow: 1
});

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(3),
    textAlign: 'center'
  },
  avatar: {
    ...size(96),
    marginBottom: theme.spacing(2)
  }
}));

export default function ElectionTemplate(props) {
  const {button, avatar} = useStyles();
  const {palette} = useTheme();
  const {localize} = useLanguage();
  const {
    slug,
    title,
    introEn,
    introFr,
    partyFirst,
    candidates
  } = props.data.pollenize.election;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Wrapper>
        <HeaderBase link="/elections" title={title}>
          <ElectionMenu
            title={title}
            electionSlug={slug}
            candidates={candidates}
            partyFirst={partyFirst}
            intro={localize(introEn, introFr)}
            candidateGridActive
          />
        </HeaderBase>
        <StyledGrid container>
          {candidates.map(candidate => {
            const party = localize(candidate.partyEn, candidate.partyFr);

            const [title, subtitle] = partyFirst
              ? [party, candidate.name]
              : [candidate.name, party];

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={
                  12 /
                  (candidates.length > 3
                    ? Math.ceil(candidates.length / 2)
                    : candidates.length)
                }
                key={candidate.id}
              >
                <CardActionArea
                  className={button}
                  component={Link}
                  to={`/elections/${slug}/${candidate.slug}`}
                  style={{
                    backgroundColor: candidate.color,
                    color: palette.getContrastText(candidate.color)
                  }}
                >
                  <Avatar className={avatar} src={candidate.portrait} />
                  <Typography variant="h5">{title}</Typography>
                  <Typography variant="subtitle1">{subtitle}</Typography>
                </CardActionArea>
              </Grid>
            );
          })}
        </StyledGrid>
      </Wrapper>
    </Layout>
  );
}

ElectionTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query ElectionQuery($id: ID!) {
    pollenize {
      election(id: $id) {
        slug
        title
        introEn
        introFr
        partyFirst
        candidates {
          id
          slug
          name
          color
          portrait
          partyEn
          partyFr
        }
      }
    }
  }
`;

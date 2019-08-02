import LanguageMenu from './language-menu';
import PropTypes from 'prop-types';
import React, {Fragment, useContext, useMemo, useState} from 'react';
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';
import {FaBars, FaRegStar, FaStar} from 'react-icons/fa';
import {Link} from 'gatsby';
import {StarsContext} from '../../utils/stars';
import {localize} from '../../utils';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 350
  },
  list: {
    backgroundColor: 'inherit'
  },
  secondaryAction: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary
  },
  starIcon: {
    marginBottom: 2,
    marginLeft: 4
  }
}));

export default function ElectionMenu(props) {
  const {paper, list, secondaryAction, starIcon} = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {stars, resetStars} = useContext(StarsContext);

  const totalStarCount = useMemo(
    () =>
      props.candidates.reduce((acc, candidate) => {
        const candidateStars = stars[candidate.id] || [];
        return acc + candidateStars.length;
      }, 0),
    [props.candidates, stars]
  );

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function handleResetClick() {
    resetStars(props.candidates);
  }

  return (
    <Fragment>
      <LanguageMenu />
      <IconButton onClick={openDrawer} color="inherit">
        <FaBars size={24} />
      </IconButton>
      <Drawer
        classes={{paper}}
        anchor="right"
        onClose={closeDrawer}
        open={drawerOpen}
      >
        <List className={list}>
          <ListSubheader>{props.title}</ListSubheader>
          {props.candidates.map(candidate => {
            const candidateStars = stars[candidate.id] || [];
            return (
              <ListItem
                button
                component={Link}
                to={`/elections/${props.slug}/${candidate.slug}`}
                key={candidate.id}
              >
                <ListItemAvatar>
                  <Avatar src={candidate.portrait} />
                </ListItemAvatar>
                <ListItemText
                  secondary={localize(
                    candidate.partyEn,
                    candidate.partyFr,
                    props.language
                  )}
                  secondaryTypographyProps={{
                    noWrap: true
                  }}
                >
                  {candidate.name}
                </ListItemText>
                <ListItemSecondaryAction className={secondaryAction}>
                  <Typography variant="body2">
                    {candidateStars.length}
                  </Typography>
                  <FaStar size={14} className={starIcon} />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <List className={list}>
          <ListSubheader>
            {localize('More options', "Plus d'options", props.language)}
          </ListSubheader>
          <ListItem
            button
            disabled={!totalStarCount}
            onClick={handleResetClick}
          >
            <ListItemIcon>
              {totalStarCount ? <FaStar size={20} /> : <FaRegStar size={20} />}
            </ListItemIcon>
            <ListItemText>
              {localize(
                'Reset stars',
                'Réinitialiser les étoiles',
                props.language
              )}
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
}

ElectionMenu.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  candidates: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired
};
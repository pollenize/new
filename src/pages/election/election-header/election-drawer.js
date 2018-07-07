import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import styled, {css} from 'react-emotion';
import theme from '../../../theme';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setEditMode} from '../../../actions/settings';
import {transparentize} from 'polished';

const drawerClassName = css({width: 320});
const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: transparentize(0.15, theme.palette.background.paper)
});

class ElectionDrawer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  onEditModeChange = event =>
    this.props.dispatch(setEditMode(event.target.checked));

  render() {
    return (
      <Drawer
        classes={{paper: drawerClassName}}
        open={this.props.open}
        onClose={this.props.onClose}
        anchor="right"
      >
        <List>
          <StyledListSubheader>Jump to candidate</StyledListSubheader>
          {this.props.election.candidates.map(candidate => (
            <ListItem
              button
              component={Link}
              to={`/elections/${this.props.election.slug}/${candidate.slug}`}
              key={candidate.id}
              onClick={this.props.onClose}
            >
              <Avatar alt={candidate.name} src={candidate.avatar} />
              <ListItemText
                primary={candidate.name}
                secondary={candidate.party}
              />
            </ListItem>
          ))}
          <StyledListSubheader>Settings</StyledListSubheader>
          <ListItem disabled>
            <ListItemIcon>
              <CompareArrowsIcon />
            </ListItemIcon>
            <ListItemText primary="Compare mode" secondary="Coming soon" />
            <ListItemSecondaryAction>
              <Switch disabled />
            </ListItemSecondaryAction>
          </ListItem>
          {this.props.user && (
            <ListItem>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit mode" />
              <ListItemSecondaryAction>
                <Switch
                  checked={this.props.editMode}
                  onChange={this.onEditModeChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode,
  election: state.election.data,
  user: state.user.data
});

export default connect(mapStateToProps)(ElectionDrawer);

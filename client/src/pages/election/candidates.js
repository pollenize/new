import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import CandidateForm from '../../components/candidate-form';
import FormDialogTrigger from '../../components/form-dialog-trigger';
import Grid from '@material-ui/core/Grid';
import ElectionHeader from './election-header';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import minBy from 'lodash/minBy';
import styled, {css} from 'react-emotion';
import theme from '../../theme';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {divisors} from 'number-theory';

const containerClassName = css({flexGrow: 1});
const LinkButton = withProps({component: Link})(ButtonBase);
const GridItem = defaultProps({
  item: true,
  component: LinkButton
})(
  styled(Grid)({
    display: 'flex',
    flexDirection: 'column'
  })
);

const Name = withProps({
  variant: 'headline',
  color: 'inherit'
})(
  styled(Typography)({
    marginBottom: theme.spacing.unit / 2
  })
);

const CreateButton = withProps({variant: 'fab'})(
  styled(Button)({
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  })
);

class Candidates extends Component {
  static propTypes = {
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired
  };

  state = {
    size: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.calculateSize);
    this.calculateSize();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.election.candidates.length !==
      prevProps.election.candidates.length
    ) {
      this.calculateSize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateSize);
  }

  calculateSize = () => {
    const {offsetWidth, offsetHeight} = this.container;
    const cellCount = Math.round(this.props.election.candidates.length / 2) * 2;
    const deltas = divisors(cellCount).map(divisor => {
      const width = offsetWidth / divisor;
      const height = offsetHeight / (cellCount / divisor);
      return {
        divisor,
        delta: Math.abs(width - height)
      };
    });

    const {divisor} = minBy(deltas, 'delta');
    this.setState({size: 12 / divisor});
  };

  render() {
    return (
      <Fragment>
        <ElectionHeader>{this.props.election.title}</ElectionHeader>
        <RootRef rootRef={node => (this.container = node)}>
          <Grid container className={containerClassName}>
            {this.props.election.candidates.map(candidate => (
              <GridItem
                xs={this.state.size}
                key={candidate.id}
                to={`/elections/${this.props.election.slug}/${candidate.slug}`}
                style={{
                  color: theme.palette.getContrastText(candidate.color),
                  backgroundColor: candidate.color
                }}
              >
                <Name>{candidate.name}</Name>
                <Typography variant="subheading" color="inherit">
                  {candidate.party}
                </Typography>
              </GridItem>
            ))}
          </Grid>
        </RootRef>
        {this.props.editMode && (
          <FormDialogTrigger
            closeOnSuccess
            form={
              <CandidateForm
                candidate={{
                  name: '',
                  party: '',
                  color: theme.palette.grey[500],
                  election_id: this.props.election.id
                }}
              />
            }
            tooltip="Create a candidate"
            tooltipProps={{placement: 'left'}}
          >
            <CreateButton>
              <AddIcon />
            </CreateButton>
          </FormDialogTrigger>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode,
  election: state.election.data
});

export default connect(mapStateToProps)(Candidates);
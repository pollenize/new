import Button from '@material-ui/core/Button';
import EditButton from '../../../../components/edit-button';
import DialogTrigger from '../../../../components/dialog-trigger';
import IconButton from '@material-ui/core/IconButton';
import PositionForm from './position-form';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import ScrollableAnchor from 'react-scrollable-anchor';
import Section from '../../../../components/section';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import mapProps from 'recompose/mapProps';
import styled from 'react-emotion';
import theme from '../../../../theme';
import withProps from 'recompose/withProps';
import {TOPIC_MAX_WIDTH, TOPIC_IMAGE_ASPECT_RATIO} from '../common';
import {connect} from 'react-redux';
import {getLocalize} from '../../../../selectors';
import {getMessageOrUntranslated} from '../../../../util/messages';

const Banner = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: TOPIC_MAX_WIDTH / TOPIC_IMAGE_ASPECT_RATIO,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  h1: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px`,
    backgroundColor: theme.palette.common.white
  }
});

const Container = withProps({small: true})(Section);
const InnerContainer = styled.div({display: 'flex'});
const MainContent = styled.div({
  flexGrow: 1
});

const Text = withProps({
  component: 'p',
  variant: 'subheading'
})(Typography);

const TextInner = styled.span(props => ({
  marginRight: theme.spacing.unit / 2,
  color: props.needsTranslation && theme.palette.text.secondary
}));

const Superscript = styled.sup({lineHeight: 1});
const StyledEditButton = styled(EditButton)({verticalAlign: 'top'});

const alternateContentWidth = 250;
const alternateContentPadding = theme.spacing.unit * 4;
const AlternateContent = styled.div({
  flexShrink: 0,
  width: alternateContentWidth,
  marginLeft: alternateContentPadding,
  paddingLeft: alternateContentPadding,
  borderLeft: `1px solid ${theme.palette.grey[100]}`
});

const Actions = styled.div({
  marginTop: theme.spacing.unit,
  marginLeft: theme.spacing.unit * -1.5,
  color: theme.palette.text.primary
});

const StyledIconButton = withProps({color: 'inherit'})(IconButton);
const Action = styled(Button)({
  marginRight: theme.spacing.unit
});

const PositionFormDialogTrigger = mapProps(props => ({
  children: props.children,
  renderContent: mapProps(closeDialog => ({
    position: props.position,
    onCancel: closeDialog,
    onSuccess: closeDialog
  }))(PositionForm)
}))(DialogTrigger);

class Topic extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    localize: PropTypes.func.isRequired,
    positions: PropTypes.array,
    topic: PropTypes.object.isRequired
  };

  static defaultProps = {
    positions: []
  };

  state = {
    more: false
  };

  onMoreClick = () =>
    this.setState(prevState => ({
      more: !prevState.more
    }));

  renderTitle(gutterBottom) {
    const [title] = this.getMessage(this.props.topic.titles);
    return (
      <Typography gutterBottom={gutterBottom} variant="display1">
        {title.text}
      </Typography>
    );
  }

  getMessage = messages => {
    const {message, match} = getMessageOrUntranslated(
      messages,
      this.props.language,
      this.props.election.languages
    );
    return [message, match];
  };

  renderPositions() {
    if (!this.props.positions.length) {
      return <Text>No official stance has been taken on this topic.</Text>;
    }

    const positions =
      this.state.more || this.props.editMode
        ? this.props.positions
        : [this.props.positions[0]];
    return positions.map((position, index, array) => {
      const [message, match] = this.getMessage(position.messages);
      return (
        <Text paragraph={index < array.length - 1} key={position.id}>
          <TextInner needsTranslation={!match}>
            {message.text}
            {position.sources.map(source => (
              <Superscript key={source.id}>
                [<a href="#sources">{source.index + 1}</a>]
              </Superscript>
            ))}
          </TextInner>
          {this.props.editMode && (
            <PositionFormDialogTrigger position={position}>
              <StyledEditButton />
            </PositionFormDialogTrigger>
          )}
        </Text>
      );
    });
  }

  renderActions() {
    const actions = [
      <StyledIconButton key="star">
        <StarBorderIcon />
      </StyledIconButton>,
      <StyledIconButton key="share">
        <ReplyIcon />
      </StyledIconButton>
    ];

    if (this.props.editMode) {
      actions.push(
        <PositionFormDialogTrigger
          key="add"
          position={{
            text: '',
            sources: [{url: ''}],
            candidate_id: this.props.candidate.id,
            topic_id: this.props.topic.id
          }}
        >
          <Action>{this.props.localize('Add a position')}</Action>
        </PositionFormDialogTrigger>
      );
    } else if (this.props.positions.length > 1) {
      const count = this.props.positions.length - 1;
      actions.push(
        <Action key="more" onClick={this.onMoreClick}>
          {this.state.more
            ? this.props.localize('Show less')
            : `${this.props.localize('See more')} (${count})`}
        </Action>
      );
    }

    return actions.length ? <Actions>{actions}</Actions> : null;
  }

  render() {
    const {slug, image, descriptions} = this.props.topic;
    const [description] = this.getMessage(descriptions);
    return (
      <ScrollableAnchor id={slug}>
        <div data-topic={slug}>
          {image && (
            <Banner style={{backgroundImage: `url(${image})`}}>
              {this.renderTitle()}
            </Banner>
          )}
          <Container>
            {!image && this.renderTitle(true)}
            <InnerContainer>
              <MainContent>
                {this.renderPositions()}
                {this.renderActions()}
              </MainContent>
              {description && (
                <AlternateContent>
                  <Typography>{description.text}</Typography>
                </AlternateContent>
              )}
            </InnerContainer>
          </Container>
        </div>
      </ScrollableAnchor>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode,
  election: state.election.data,
  language: state.settings.language,
  localize: getLocalize(state)
});

export default connect(mapStateToProps)(Topic);

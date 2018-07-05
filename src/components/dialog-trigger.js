import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Tooltip from '@material-ui/core/Tooltip';

class DialogTrigger extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    renderContent: PropTypes.func.isRequired,
    tooltip: PropTypes.string,
    tooltipProps: PropTypes.object
  };

  state = {
    dialogOpen: false
  };

  onClick = event => {
    event.currentTarget.blur();
    this.setState({dialogOpen: true});
  };

  closeDialog = () => this.setState({dialogOpen: false});

  renderTrigger() {
    const {children} = this.props;
    const trigger = React.cloneElement(children, {onClick: this.onClick});
    if (!this.props.tooltip) {
      return trigger;
    }

    return (
      <Tooltip {...this.props.tooltipProps} title={this.props.tooltip}>
        {trigger}
      </Tooltip>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderTrigger()}
        <Dialog
          fullWidth
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          {this.props.renderContent(this.closeDialog)}
        </Dialog>
      </Fragment>
    );
  }
}

export default DialogTrigger;
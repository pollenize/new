import Form from '../../../../components/form';
import FormField from '../../../../components/form-field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import slugify from 'slugify';
import {connect} from 'react-redux';
import {
  save as saveTopic,
  remove as removeTopic,
  reset as resetTopic
} from '../../../../actions/topic';

class TopicForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    success: PropTypes.bool.isRequired,
    topic: PropTypes.object.isRequired
  };

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  onSubmit = event => {
    event.preventDefault();

    const title = event.target.title.value;
    this.props.dispatch(
      saveTopic({
        id: this.props.topic.id,
        title,
        slug: slugify(title, {lower: true}),
        description: event.target.description.value,
        election_id: this.props.topic.election_id
      })
    );
  };

  onDelete = () => this.props.dispatch(removeTopic(this.props.topic.id));

  render() {
    return (
      <Form
        noun="topic"
        editing={Boolean(this.props.topic.id)}
        loading={this.props.loading}
        onCancel={this.props.onCancel}
        onDelete={this.onDelete}
        onSubmit={this.onSubmit}
        onSuccess={this.props.onSuccess}
        success={this.props.success}
      >
        <FormField
          label="Title"
          name="title"
          defaultValue={this.props.topic.title}
        />
        <FormField
          multiline
          label="Description"
          name="description"
          defaultValue={this.props.topic.description}
        />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.topic.loading,
  success: state.topic.success
});

export default connect(mapStateToProps)(TopicForm);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Meteor from 'react-meteor-client';
import classnames from 'classnames';

// Task component - represents a single todo item
class Task extends Component {
  constructor(props) {
    super(props);

    this.toggleChecked = this.toggleChecked.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    const { task: { _id: taskId, checked } } = this.props;
    Meteor.call('tasks.setChecked', taskId, !checked);
  }

  deleteThisTask() {
    const { task: { _id: taskId } } = this.props;
    Meteor.call('tasks.remove', taskId);
  }

  togglePrivate() {
    const { task: { _id: taskId, private: isPrivate } } = this.props;
    Meteor.call('tasks.setPrivate', taskId, !isPrivate);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const { task, showPrivateButton } = this.props;
    const { username, text, checked, private: isPrivate } = task;
    const taskClassName = classnames({
      checked,
      private: isPrivate,
    });

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!checked}
          onClick={this.toggleChecked}
        />

        { showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { isPrivate ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
          <strong>{username}</strong>: {text}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.objectOf(PropTypes.any),
  showPrivateButton: PropTypes.bool,
};

Task.defaultProps = {
  task: {},
  showPrivateButton: false,
};

export default Task;

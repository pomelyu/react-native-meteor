import React from 'react';
import PropTypes from 'prop-types';
import Meteor from '@pomelyu/react-meteor-client';

import Task from '../Task';
import AccountsUIWrapper from '../AccountsUIWrapper';

// App component - represents the whole app
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      hideCompleted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
    this.textOnChange = this.textOnChange.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { text } = this.state;
    Meteor.call('tasks.insert', text);
    this.setState({ text: '' });
  }

  toggleHideCompleted() {
    this.setState({ hideCompleted: !this.state.hideCompleted });
  }

  textOnChange(event) {
    const text = event.target.value;
    this.setState({ text });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    const { _id: currentUserId } = this.props.currentUser || {};
    return filteredTasks.map((task) => {
      const showPrivateButton = task.owner === currentUserId;
      const { _id: taskId } = task;
      return (
        <Task
          key={taskId}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    const { text, hideCompleted } = this.state;
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed" htmlFor="true">
            <input
              type="checkbox"
              readOnly
              checked={hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit} >
              <input
                type="text"
                value={text}
                onChange={this.textOnChange}
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any),
  incompleteCount: PropTypes.number,
};

App.defaultProps = {
  tasks: [],
  currentUser: null,
  incompleteCount: 0,
};

export default App;

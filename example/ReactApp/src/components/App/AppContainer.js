import Meteor, { createContainer } from '@pomelyu/react-meteor-client';

import App from './App';

const mapMeteorDataToProps = () => {
  Meteor.subscribe('tasks');
  return {
    tasks: Meteor.collection('tasks').find({}, { sort: { createdAt: -1 } }) || [],
    incompleteCount: Meteor.collection('tasks').find({ checked: { $ne: true } }).length,
    currentUser: Meteor.user() || null,
  };
};

export default createContainer(mapMeteorDataToProps, App);

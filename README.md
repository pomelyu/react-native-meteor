# react-meteor-client
Served as client-side package for meteor subscription and method caller

This repository is forked from [inProgress-team/react-native-meteor](https://github.com/inProgress-team/react-native-meteor), and modified according to [ZevenFang/react-meteor](https://github.com/ZevenFang/react-meteor)

## Usage
```javascript
import Metor, { creatContainer } from 'react-meteor-client';
import App from './App';

const mapMeteorDataToProps = () => {
  Meteor.subscribe('tasks');
  return {
    tasks: Meteor.collection('tasks').find({}) || [],
    incompleteCount: Meteor.collection('tasks').find({ checked: { $ne: true } }).length,
    currentUser: Meteor.user() || null,
  };
};

export default createContainer(mapMeteorDataToProps, App);
```


## Example
```bash
# Build this package
npm install
npm run build

# Meteor server side (official todos example)
cd example/MeteorApp
meteor npm install
meteor npm start # meteor would run at localhost:3333

# React client side
cd example ReactApp
npm install
npm start # create-react-app would run at localhost:3000
```

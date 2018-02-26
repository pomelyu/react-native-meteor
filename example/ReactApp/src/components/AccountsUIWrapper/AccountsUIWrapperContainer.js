import Meteor, { createContainer } from '@pomelyu/react-meteor-client';
import AccountsComponent from './AccountsUIWrapper';

const mapMeteorDataToProps = () => {
  const isLogin = Boolean(Meteor.user());
  const username = isLogin ? Meteor.user().username : undefined;
  return { username, isLogin };
};

export default createContainer(mapMeteorDataToProps, AccountsComponent);

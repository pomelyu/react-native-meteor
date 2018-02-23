import React from 'react';

import withTracker from './withTracker';

export default function createContainer(mapMeteorDataToProps, WrappedComponent) {
  return withTracker(mapMeteorDataToProps)(WrappedComponent);
}

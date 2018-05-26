import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

class NetworkStatus extends PureComponent {
  componentDidMount() {

    // document.body.style.borderTop = '4px solid red'

  }

  render() {
    return (
      <div />
    );
  }
}

NetworkStatus.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NetworkStatus;

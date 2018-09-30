// import axios from 'axios';
import gql from 'graphql-tag';
// import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import { Subscription } from 'react-apollo';

import './button.css';

const onTempChanged = gql`
  subscription onTempChangedByCoreId ($coreId: String!){
    roomTemp: onRoomTempByCoreId (coreId: $coreId) {
      coreId: coreid
      data {
        temp: dhtTemperature
      }
    }
  }
`;

const onSpeakerStatusChange = gql`
  subscription onSpeakerStatusChangeByCoreId ($coreId: String!) {
    speakerStatus: onSpeakerStatusByCoreId(coreId: $coreId) {
      coreId: coreid
      status: data
    }
  }
`;

class Button extends PureComponent {
  handleClick(coreId, e) {
    e.preventDefault();
    console.log(`handle click called ${coreId}`);

    /*
    axios
      .post(`${process.env.REACT_APP_GRAPHQL_HOST}/api/brb/ack`, { coreId });
    */
  }

  // we need to pass in room name and core id
  render() {
    return (
      <div className='button' onClick={e => this.handleClick(this.props.coreId, e)}>

        <Subscription subscription={onSpeakerStatusChange} variables={{ coreId: this.props.coreId }}>
          {({ loading, data, error }) => {
            // if (loading) return null;
            if (loading) return <p>...</p>;
            if (error) return <p>MAYDAY: {error}</p>;

            return (
              <div>{data.speakerStatus.status}</div>
            );
          }}
        </Subscription>

        <div>{this.props.roomName}</div>

        <Subscription subscription={onTempChanged} variables={{ coreId: this.props.coreId }}>
          {({ loading, data, error }) => {
            // if (loading) return null;
            if (loading) return <p>...</p>;
            if (error) return <p>MAYDAY: {error}</p>;

            return (
              <div>{data.roomTemp.data.temp}</div>
            );
          }}
        </Subscription>

        <div>Signal</div>
      </div>
    );
  }
}


export default Button;

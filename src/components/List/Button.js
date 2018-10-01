import axios from 'axios';
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
  constructor(props) {
    super(props);

    this.state = {
      speakerStatus: 'GREEN',
    };
  }

  getFill() {
    let results = 'defaultStatus';

    switch (this.state.speakerStatus.toUpperCase()) {
      case 'RED':
        results = 'error';
        break;

      case 'YELLOW':
        results = 'ack';
        break;

      default:
        results = 'defaultStatus';
        break;
    };

    return results;
  }

  handleClick(coreId, e) {
    e.preventDefault();
    console.log(`handle click called ${coreId}`);

    axios
      .post(`${process.env.REACT_APP_GRAPHQL_HOST}/api/brb/ack`, { coreId });
  }

  // we need to pass in room name and core id
  render() {
    return (
      <div className={`button ${this.getFill()}`} onClick={e => this.handleClick(this.props.coreId, e)} >

        <Subscription subscription={onSpeakerStatusChange} variables={{ coreId: this.props.coreId }}>
          {({ loading, data, error }) => {
            // if (loading) return null;
            if (loading) return <div>...</div>;
            if (error) return <div>MAYDAY: {error}</div>;

            this.setState({
              ...this.state,
              speakerStatus: data.speakerStatus.status.toUpperCase(),
            });

            let result;
            switch (data.speakerStatus.status.toUpperCase()) {
              case 'RED':
                result = <span role="img" aria-label="error image">🔴</span>;
                break;

              case 'YELLOW':
                result = <span role="img" aria-label="yellow image">⚠️</span>;
                break;

              default:
                result = <span role="img" aria-label="default image">✅</span>;
                break;
            }

            return result;
          }}
        </Subscription>

        <div>{this.props.roomName}</div>

        <Subscription subscription={onTempChanged} variables={{ coreId: this.props.coreId }}>
          {({ loading, data, error }) => {
            // if (loading) return null;
            if (loading) return <div>...</div>;
            if (error) return <div>MAYDAY: {error}</div>;

            return (
              <div>{Number.parseFloat(data.roomTemp.data.temp).toFixed(2)}</div>
            );
          }}
        </Subscription>

        <div>Signal</div>
      </div>
    );
  }
}


export default Button;

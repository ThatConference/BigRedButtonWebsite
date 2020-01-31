import axios from 'axios';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import Icon from '../common/Icon';

const ON_TEMP_CHANGED = gql`
  subscription onTempChangedByCoreId($coreId: String!) {
    roomTemp: onRoomTempByCoreId(coreId: $coreId) {
      coreId: coreid
      data {
        temp: dhtTemperature
      }
    }
  }
`;

const ON_SPEAKER_STATUS_CHANGE = gql`
  subscription onSpeakerStatusChangeByCoreId($coreId: String!) {
    speakerStatus: onSpeakerStatusByCoreId(coreId: $coreId) {
      coreId: coreid
      status: data
    }
  }
`;

const ON_DEVICE_HEALTH = gql`
  subscription onDevice($coreId: String!) {
    onDeviceMonitor(coreId: $coreId) {
      coreId: coreid
      data {
        device {
          network {
            connection {
              status
            }
            signal {
              strength
              quality
            }
          }
        }
      }
    }
  }
`;

const CheckIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.success};
  position: relative;
  top: 0.5rem;
`;

const ErrorIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.danger};
  position: relative;
  top: 0.5rem;
`;

const WarningIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.warning};
  position: relative;
  top: 0.5rem;
`;

const Button = ({ coreId, id, roomName, tcId }) => {
  const [speakerStatus, setSpeakerStatus] = useState('GREEN');
  const [temp, setTemp] = useState('');
  const [deviceStrength, setDeviceStrength] = useState('');
  const [deviceStatus, setDeviceStatus] = useState('');

  const checkmark = <CheckIcon icon="check" viewBoxHeight="15" viewBoxWidth="15" />;
  const errorIcon = <ErrorIcon icon="close" viewBoxHeight="17" viewBoxWidth="17" height="2.1rem" width="2.1rem" />;
  const warningIcon = <WarningIcon icon="error" viewBoxHeight="17" viewBoxWidth="17" height="2.1rem" width="2.1rem" />;

  const handleClick = (e) => {
    e.preventDefault();
    console.log(`handle click called ${coreId} `);

    axios.post(`${process.env.REACT_APP_GRAPHQL_HOST}/api/brb/ack`, { coreId });
  };

  const { loading: tempLoading, error: tempError } = useSubscription(ON_TEMP_CHANGED, {
    variables: { coreId },
    onSubscriptionData: ({
      subscriptionData: {
        data: { roomTemp },
      },
    }) => {
      setTemp(Number.parseFloat(roomTemp.data.temp).toFixed(2));
    },
  });

  const { loading: speakerStatusLoading, error: speakerStatusError } = useSubscription(
    ON_SPEAKER_STATUS_CHANGE,
    {
      variables: { coreId },
      onSubscriptionData: ({
        subscriptionData: {
          data: { speakerStatus },
        },
      }) => {
        setSpeakerStatus(speakerStatus.status.toUpperCase());
      },
    },
  );

  const { loading: deviceStrengthLoading, error: deviceStrengthError } = useSubscription(
    ON_DEVICE_HEALTH,
    {
      variables: { coreId },
      onSubscriptionData: ({ subscriptionData: { data } }) => {
        console.log('device health data', data);
        setDeviceStrength(data.onDeviceMonitor.data.device.network.signal.strength);
        setDeviceStatus(data.onDeviceMonitor.data.device.network.connection.status);
      },
    },
  );

  const getStatusIcon = () => {
    if (speakerStatusLoading) return '...';
    if (speakerStatusError) return `ERR: ${speakerStatusError}`;

    switch (speakerStatus) {
      case 'RED':
        return errorIcon;
      case 'YELLOW':
        return warningIcon;
      default:
        return checkmark;
    }
  };

  const getTemp = () => {
    if (tempLoading) return '...';
    if (tempError) return `ERR: ${tempError}`;

    return temp;
  };

  const getDeviceHealth = () => {
    if (deviceStrengthLoading) return '...';
    if (deviceStrengthError) return `ERR: ${deviceStrengthError}`;

    if (deviceStatus !== -1) {
      return (
        <>
          {checkmark}
          <span>{deviceStrength}</span>
        </>
      );
    }

    return errorIcon;
  };

  return (
    <tr key={id} className="button" onClick={(e) => handleClick(e)}>
      <td>{getStatusIcon()}</td>
      <td>{roomName}</td>
      <td>{tcId}</td>
      <td>{getTemp()}</td>
      <td>{getDeviceHealth()}</td>
    </tr>
  );
};

Button.propTypes = {
  coreId: PropTypes.string.isRequired,
  id: PropTypes.string,
  roomName: PropTypes.string.isRequired,
  tcId: PropTypes.string.isRequired,
};

Button.defaultProps = {
  id: '',
};

export default Button;

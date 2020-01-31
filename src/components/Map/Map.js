import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import FloorMap from './FloorMap';

const GET_DEVICES = gql`
  query getDevices {
    buttons {
      coreId
      roomName
      tcId
    }
  }
`;

const Map = () => {
  const { loading, data } = useQuery(GET_DEVICES);
  if (loading) return null;
  return <FloorMap {...data} />;
};

export default Map;

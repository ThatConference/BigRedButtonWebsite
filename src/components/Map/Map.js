import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

import FloorMap from './FloorMap';
import './Map.css';

const getDevices = gql`
  query getDevices {
    devices {
      coreId
      roomName
      tcId
    }
  }
`;

const Map = () => (
  <Query query={getDevices}>
    {({ loading, error, data }) => {
      if (loading) return null;
      return <FloorMap {...data} />;
    }}
  </Query>
);

export default Map;

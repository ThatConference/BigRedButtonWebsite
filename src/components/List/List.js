import gql from 'graphql-tag';
import React from 'react';
import { PropTypes } from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
// import styled from 'styled-components';

import Button from './Button';

const GET_BUTTONS = gql`
  query customers($customerId: String!) {
    buttons: customers(customerId: $customerId) {
      id
      coreId
      roomName
      tcId
    }
  }
`;

const List = (props) => {
  const { customerId } = props.match.params;
  const { loading, error, data } = useQuery(GET_BUTTONS, {
    variables: { customerId },
  });

  if (loading) return null;
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Room</th>
            <th>Button ID</th>
            <th>Temperature</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {data.buttons.map((b) => (
            <Button key={b.id} coreId={b.coreId} roomName={b.roomName} tcId={b.tcId} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

List.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      customerId: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default List;

import gql from 'graphql-tag';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Query } from 'react-apollo';

import './list.css';
import Button from './Button';

const getButtons = gql`
  query customers ($customerId: String!) {
    buttons: customers (customerId: $customerId) {
      id
      coreId
      roomName
    }
  }
`;

const List = (props) => {
  const { customerId } = props.match.params;

  return (
    <Query query={getButtons} variables={{ customerId }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return <div>MAYDAY: {error}</div>;

        return (
          <div className='listContainer'>
            {data.buttons.map(b => <div className="button"><Button key={b.id} coreId={b.coreId} roomName={b.roomName} /></div>)}
          </div>
        );
      }}
    </Query>
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

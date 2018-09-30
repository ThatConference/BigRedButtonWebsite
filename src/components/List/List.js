import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Query } from 'react-apollo';

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

        // return (
        //   <Fragment>
        //     <Button key='22001f000b47353137323334' coreId='22001f000b47353137323334' roomName='foo' />
        //     <Button key='29002c001847353236343033' coreId='29002c001847353236343033' roomName='foo' />
        //     <Button key='2b001c000347353137323334' coreId='2b001c000347353137323334' roomName='foo' />
        //   </Fragment>
        // );

        return (
          <Fragment>
            {data.buttons.map(b => <Button key={b.coreId} coreId={b.coreId} roomName={b.roomName} />)}
          </Fragment>
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

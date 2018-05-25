import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

const Data = ({ results }) => (
  <Fragment>
    <span>{results}</span>
  </Fragment>
);

Data.propTypes = {
  results: PropTypes.string.isRequired,
};

export default Data;

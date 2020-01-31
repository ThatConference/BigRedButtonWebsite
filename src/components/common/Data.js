import { PropTypes } from 'prop-types';
import React from 'react';

const Data = ({ results }) => (
  <>
    <span>{results}</span>
  </>
);

Data.propTypes = {
  results: PropTypes.string.isRequired,
};

export default Data;

import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { svgs } from '../../utilities';

const Svg = styled.svg`
  width: auto;
  height: 100%;

  &.down {
    transform: rotate(0deg);
  }

  &.up {
    transform: rotate(180deg);
  }

  &.left {
    transform: rotate(-270deg);
  }

  &.right {
    transform: rotate(-90deg);
  }
`;

const Icon = ({
  className, height, icon, onClick, viewBoxHeight, viewBoxWidth, width,
}) => (
  <Svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    height={height}
    width={width}
    viewBox={`0 0 ${viewBoxHeight || height || '24'} ${viewBoxWidth || width || '24'}`}
  >
    <title>{svgs[icon].title}</title>
    {svgs[icon].path.map((item) => (
      <path key={item} d={item} />
    ))}
  </Svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  viewBoxHeight: PropTypes.string,
  viewBoxWidth: PropTypes.string,
  width: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  height: '2rem',
  onClick: () => {},
  viewBoxHeight: '',
  viewBoxWidth: '',
  width: '2rem',
};

export default Icon;

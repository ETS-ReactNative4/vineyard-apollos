import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Circle, Path } from 'react-native-svg';

import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 32, fill } = {}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M77.35142,201.87677l-32.2031,27.07116a8,8,0,0,1-13.14783-6.12372V64.00049a8,8,0,0,1,8-8h176a8,8,0,0,1,8,8v128a8,8,0,0,1-8,8H82.49925A8,8,0,0,0,77.35142,201.87677Z"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <Circle cx="128" cy="128" r="12" />
    <Circle cx="80" cy="128" r="12" />
    <Circle cx="176" cy="128" r="12" />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;

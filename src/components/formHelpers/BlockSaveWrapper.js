import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node
};

const style = {
  padding: '0 15px'
};

function BlockSaveWrapper({ children }) {
  return <div style={style}>{children}</div>;
}

BlockSaveWrapper.displayName = 'BlockSaveWrapper';
BlockSaveWrapper.propTypes = propTypes;

export default BlockSaveWrapper;

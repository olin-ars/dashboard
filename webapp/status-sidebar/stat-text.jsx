import React from 'react';
import PropTypes from 'prop-types';

export default class StatText extends React.Component {
  render() {
    const {
      title,
      children,
    } = this.props;

    return (
      <div className="stat-text">
        <span className="title">{title}</span>
        <span className="value">{children}</span>
      </div>
    );
  }
}

StatText.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

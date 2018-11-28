import * as React from 'react';
import SVGInline from 'react-svg-inline';
import PropTypes from 'prop-types';
import OARSLogo from '../svg/OARS-logo.svg';

export default class SidebarHeader extends React.Component {
  render() {
    const { homeClicked } = this.props;
    return (
      <header className="header-content">
        <button
          className="logo"
          onClick={homeClicked}
          title="Home"
          type="button"
        >
          <SVGInline svg={OARSLogo} className="logo" />
        </button>
      </header>
    );
  }
}

// Define React prop types for type checking during development
SidebarHeader.propTypes = {
  homeClicked: PropTypes.func.isRequired,
};

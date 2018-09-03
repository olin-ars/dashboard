import * as React from "react";
import SVGInline from 'react-svg-inline';
import OARSLogo from '../svg/OARS-logo.svg';
import PropTypes from 'prop-types';

export default class SidebarHeader extends React.Component {
  render() {
    const { homeClicked } = this.props;
    return (
      <header className="header-content">
        <button onClick={homeClicked} title="Home"><SVGInline svg={OARSLogo} className="logo" /></button>
      </header>
    );
  }
}

// Define React prop types for type checking during development
SidebarHeader.propTypes = {
  homeClicked: PropTypes.func.isRequired,
};

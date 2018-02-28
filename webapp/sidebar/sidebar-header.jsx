import * as React from "react";
import SVGInline from 'react-svg-inline';
import OARSLogo from '../svg/OARS-logo.svg';
import PropTypes from 'prop-types';

export class SidebarHeader extends React.Component {
  render() {
    return (
      <header className="header-content">
        <a onClick={this.props.homeClicked} alt="Home" title="Home"><SVGInline svg={OARSLogo} className="logo"/></a>
      </header>
    )
  }
}

// Define React prop types for type checking during development
SidebarHeader.propTypes = {
  homeClicked: PropTypes.func,
};
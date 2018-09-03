// This container is a sort of middleware between the React sidebar and the Redux data store

import { connect } from 'react-redux';
import Sidebar from '../nav-sidebar/sidebar';
// import * as Actions from '../data/actions';
// import { push } from 'react-router-redux';
// import ReactGA from 'react-ga';

// This function passes values/objects from the Redux state to the React component as props
const mapStateToProps = state => ({
  general: state.general,
  isCollapsed: state.sidebar.isCollapsed,
  sidebarMode: state.sidebar.mode,
});

// This function passes functions from /srcs/data/actions.jsx to the React component as props
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({
  // homeClicked: () => {
  //   ReactGA.event({
  //     category: 'Sidebar Logo',
  //     action: 'click',
  //     label: 'User clicked the Olin logo to return to the Home view',
  //   });
  //   dispatch(push('/'));
  // },
  // toggleSidebarCollapsed: () => {
  //   dispatch(Actions.toggleSidebarCollapsed());
  // },
});

// Connect props to Redux state and actions
const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;

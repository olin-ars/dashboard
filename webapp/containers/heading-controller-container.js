// This container is a sort of middleware between the React sidebar and the Redux data store

// This function passes values/objects from the Redux state to the React component as props

import { connect } from 'react-redux';
import HeadingController from '../heading-controller';
import {
  setHeadingControllerKi,
  setHeadingControllerKp,
} from '../data/actions';

const mapStateToProps = state => {
  return {
    kp: state.control.heading.kp,
    ki: state.control.heading.ki,
  }
};

// This function passes functions from /srcs/data/actions.jsx to the React component as props
const mapDispatchToProps = dispatch => {
  return {
    iTermChanged: (e) => {
      dispatch(setHeadingControllerKi(e.target.value));
    },
    pTermChanged: (e) => {
      dispatch(setHeadingControllerKp(e.target.value));
    },
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
  }
};

// Connect props to Redux state and actions
const HeadingControllerContainer = connect(mapStateToProps, mapDispatchToProps)(HeadingController);

export default HeadingControllerContainer;
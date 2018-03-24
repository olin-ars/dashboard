// This container is a sort of middleware between the React sidebar and the Redux data store

// This function passes values/objects from the Redux state to the React component as props

import { connect } from 'react-redux';
import StatusSidebar from '../status-sidebar/status-sidebar';
import {
  setOperatingMode,
  setHeadingControllerKi,
  setHeadingControllerKp,
  setTargetHeading,
} from "../data/actions";

const mapStateToProps = state => {
  return {
    latitude: state.boat.latitude,
    longitude: state.boat.longitude,
    heading: state.boat.heading,
    control: state.control,
    wind: state.environment.wind,
  }
};

// This function passes functions from /webapp/data/actions.jsx to the React component as props
const mapDispatchToProps = dispatch => {
  return {
    iTermChanged: (e) => {
      dispatch(setHeadingControllerKi(e.target.value));
    },
    pTermChanged: (e) => {
      dispatch(setHeadingControllerKp(e.target.value));
    },
    setTargetHeading: (e) => {
      dispatch(setTargetHeading(e.target.value));
    },
    setOperatingMode: (e) => {
      dispatch(setOperatingMode(parseInt(e.target.value)));
    }
  }
};

// Connect props to Redux state and actions
const StatusSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(StatusSidebar);

export default StatusSidebarContainer;
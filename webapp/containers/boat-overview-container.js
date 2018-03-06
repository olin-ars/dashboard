// This container is a sort of middleware between the React sidebar and the Redux data store

// This function passes values/objects from the Redux state to the React component as props

import { connect } from 'react-redux';
import BoatOverview from '../boat-overview';

const mapStateToProps = state => {
  return {
    latitude: state.boat.latitude,
    longitude: state.boat.longitude,
    heading: state.boat.heading,
  }
};

// This function passes functions from /srcs/data/actions.jsx to the React component as props
const mapDispatchToProps = dispatch => {
  return {
  }
};

// Connect props to Redux state and actions
const BoatOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(BoatOverview);

export default BoatOverviewContainer;
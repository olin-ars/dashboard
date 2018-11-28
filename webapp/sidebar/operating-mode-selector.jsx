import React from 'react';
import PropTypes from 'prop-types';

export default class OperatingModeSelector extends React.Component {
  render() {
    const {
      control,
      setOperatingMode,
    } = this.props;

    return (
      <div className="operating-mode">
        <input
          type="radio"
          name="op-mode"
          checked={control.operatingMode === 0}
          onClick={setOperatingMode}
          value={0}
        />
        <label>Full manual</label>
        <br />
        <input
          type="radio"
          name="op-mode"
          checked={control.operatingMode === 1}
          onClick={setOperatingMode}
          value={1}
        />
        <label>Autonomous sails, manual rudder</label>
        <br />
        <input
          type="radio"
          name="op-mode"
          checked={control.operatingMode === 2}
          onClick={setOperatingMode}
          value={2}
        />
        <label>Fully autonomous</label>
        <br />
      </div>
    );
  }
}

OperatingModeSelector.propTypes = {
  control: PropTypes.shape({
    operatingMode: PropTypes.number,
  }).isRequired,
  setOperatingMode: PropTypes.func.isRequired,
};

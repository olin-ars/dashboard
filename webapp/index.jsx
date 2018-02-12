import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import styles from './css/styles.css';
import BoatOverview from './boat-overview';

class App extends React.Component {
    render() {
        return (
            <BoatOverview/>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

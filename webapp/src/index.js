import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
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

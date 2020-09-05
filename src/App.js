import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Contacts from './components/contact/Contacts';
import AddContact from './components/contact/AddContact';
import EditContact from './components/contact/EditContact';

import Header from './components/layout/Header';
import About from './components/pages/About';

import { Provider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NotFound from './components/pages/NotFound';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
              {/* <AddContact />
            <Contacts /> */}
            </div>
          </div>
        </Router>
      </Provider>
    );
  }

  // render() {
  //   return React.createElement(
  //     'div', {
  //       className: 'App'
  //     },
  //     React.createElement('h1', null, 'The App Component')
  //   );
  // }
}

// function App() {
//   return (
//     <div className="App">
//       <h1> The App Component! </h1>
//     </div>
//   );
// }

export default App;

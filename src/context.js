import React, { Component } from 'react';
import Axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    // break;
    case 'Add_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };

    // break;
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        ),
      };

    // break;

    default:
      return state;
    // break;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      // {
      //   id: 1,
      //   name: 'Jobayer Ahmad',
      //   email: 'jobayer@gmail.com',
      //   phone: '555-5555-5555',
      // },
      // {
      //   id: 2,
      //   name: 'Nakeba Ahmad',
      //   email: 'nakeba@gmail.com',
      //   phone: '555-444-5555',
      // },
      // {
      //   id: 3,
      //   name: 'Mahek Nakeba',
      //   email: 'mahek@gmail.com',
      //   phone: '555-5322-5555',
      // },
    ],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  async componentDidMount() {
    const res = await Axios.get('https://jsonplaceholder.typicode.com/users');

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

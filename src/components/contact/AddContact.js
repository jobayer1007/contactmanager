import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import Axios from 'axios';
// import uuid from 'react-uuid';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check for errors! name
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    // Check for errors! email
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    // Check for errors! phone
    if (phone === '') {
      this.setState({ errors: { phone: 'Email is required' } });
      return;
    }

    const newContact = {
      // id: uuid(),
      name,
      email,
      phone,
    };

    const res = await Axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );

    dispatch({ type: 'Add_CONTACT', payload: res.data });

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
    });

    this.props.history.push('/');
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  {/* <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder="Enter Phone..."
                      value={phone}
                      onChange={this.onChange}
                    />
                  </div> */}
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;

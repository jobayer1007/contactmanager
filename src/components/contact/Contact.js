import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import Axios from 'axios';
// import uuid from 'react-uuid';

class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  onDeleteClick = async (id, dispatch) => {
    // this.props.deleteClickHandler();
    await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  // onShowClick = (e) => {
  //   this.setState({ showContactInfo: !this.state.showContactInfo });
  // };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                Name: {name}{' '}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                ></i>
                <i
                  className="fas fa-trash-alt"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                ></i>
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'brown',
                      marginRight: '1rem',
                    }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  // deleteClickHandler: PropTypes.func.isRequired,
};

export default Contact;

import React from 'react';
import axios from './plugins/axios';
import UserDetails from './UserDetails';

export default class User extends React.Component {
  state = {
    user: {},
    userComments: []
  };
  componentDidMount() {
    this.displayUserDetails();
  }
  getUserComments = async (id) => await axios.get(`/item/${id}.json`);

  displayUserDetails = async () => {
    const userId = this.props.match.params.id;
    const response = await axios.get(`/user/${userId}.json`);
    this.setState({ user: response.data });
  };

  render() {
    const { user } = this.state;

    return (
      <div>
        <UserDetails
          about={user.about}
          created={user.created}
          id={user.id}
          karma={user.karma}
          submitted={user.submitted}
        />
      </div>
    );
  }
}

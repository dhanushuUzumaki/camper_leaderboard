import React from 'react';
import axios from 'axios';

const recentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const allTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

class Leaderboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fetchingData: true
    };
    this.renderLeaderboard = () => this._renderLeaderboard();
  }

  componentDidMount () {
    axios.all([
      axios.get(recentUrl),
      axios.get(allTimeUrl)
    ])
      .then(axios.spread((recent, allTime) => {
        this.setState({
          recent,
          allTime,
          fetchingData: false
        });
      }))
      .catch((e) => {
        this.setState({
          error: e
        });
      });
  }

  _renderLeaderboard () {
    const { fetchingData, recent, allTime, error } = this.state;
    if (fetchingData) {
      return (
        <div className="overlay">
          <div className="loader" />
        </div>
      );
    } else if (error) {
      return (
        <div className="error">
          Oops! Something went wrong. Please try after some time.
        </div>
      );
    }
    console.log(recent, allTime);
    return (
      <div className="board">
        Leaderboard
      </div>
    );
  }

  render () {
    return (
      <div className="leaderboard">
        {this.renderLeaderboard()}
      </div>
    );
  }
}

export default Leaderboard;

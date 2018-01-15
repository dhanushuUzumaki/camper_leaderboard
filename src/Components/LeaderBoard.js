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
    this.renderLeaderboard = (props, state) => this._renderLeaderboard(props, state);
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
      .catch(e => {
        this.setState({
          error: e
        });
      });
  }

  _renderLeaderboard (props, state) {
    const { fetchingData, recent, allTime, error } = state;
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
    } else {
      if (recent !== undefined && allTime !== undefined) {
        console.log(recent, allTime);
        return (
          <div className="board">
            Leaderboard
          </div>
        );
      }
    }
  }

  render () {
    return (
      <div className="leaderboard">
        {this.renderLeaderboard(this.props, this.state)}
      </div>
    )
  }
}

export default Leaderboard;

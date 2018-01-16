import React from 'react';
import axios from 'axios';

const recentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const allTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

const isActive = (selected, actual) => {
  if (selected === actual) {
    return 'active';
  }
  return '';
};

class Leaderboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fetchingData: true,
      selected: 'recent'
    };
    this.renderLeaderboard = () => this._renderLeaderboard();
    this.renderTable = (dataToRender, selected) => this._renderTable(dataToRender, selected);
  }

  componentDidMount () {
    axios.all([
      axios.get(recentUrl),
      axios.get(allTimeUrl)
    ])
      .then(axios.spread((recentResponse, allTimeResponse) => {
        this.setState({
          recent: recentResponse.data,
          allTime: allTimeResponse.data,
          fetchingData: false
        });
      }))
      .catch((e) => {
        this.setState({
          error: e
        });
      });
  }

  _renderTable (dataToRender, selected) {
    console.log(this.state);
    return (
      <table>
        <thead>
          <th>#</th>
          <th>Name</th>
          <th
            className={'cursor ' + isActive(selected, 'recent')}
            onClick={(e) => this.setState({selected: 'recent'})}
          >
            Points in last 30 Days
          </th>
          <th
            className={'cursor ' + isActive(selected, 'allTime')}
            onClick={(e) => this.setState({selected: 'allTime'})}
          >
            All Time Points
          </th>
        </thead>
        <tbody>
          {
            (() => dataToRender.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{data.username}</td>
                <td>{data.recent}</td>
                <td>{data.alltime}</td>
              </tr>
            ))
          )()
          }
        </tbody>
      </table>
    );
  }

  _renderLeaderboard () {
    const { fetchingData, recent, allTime, error, selected } = this.state;
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
    const dataToRender = selected === 'recent' ? recent : allTime;
    return this.renderTable(dataToRender, selected);
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

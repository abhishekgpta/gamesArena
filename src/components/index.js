import React from "react";
import data from "../gamesext";
import GamesTable from "./gamesTable";
import GamesSearch from "./gamesSearch";
class GamesArena extends React.Component {
  state = {
    data: data,
    query: ""
  };
  componentDidMount() {
    // fetch("http://starlord.hackerearth.com/gamesext")
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     this.setState(data);
    //   });
  }
  handleChange = e => {
    const val = e.target.value;
    this.setState({ query: val });
  };
  render() {
    let { data = [], query } = this.state;
    let filteredData = data.filter(record => {
      let { title = "", genre = "", platform = "" } = record;
      return (
        title
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        genre
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        platform
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    });
    return (
      <div className="game__container">
        <GamesSearch handleChange={this.handleChange} query={query} />
        <GamesTable data={filteredData} />
      </div>
    );
  }
}
export default GamesArena;

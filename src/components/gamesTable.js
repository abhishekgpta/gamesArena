import React from "react";
import {
  faCheckCircle,
  faTimesCircle,
  faSort,
  faSortDown,
  faSortUp,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const icontype = {
  asc: faSortDown,
  desc: faSortUp
};
class GamesTable extends React.Component {
  state = {
    sortBy: "",
    sortType: "",
    per_page: 10,
    page: 0
  };
  componentDidUpdate(prevProps) {
    if (prevProps.data.length !== this.props.data.length) {
      this.setState({ page: 0 });
    }
  }
  handleClick = e => {
    e.preventDefault();
    const type = e.target.getAttribute("data-type");
    this.setState(prevState => {
      if (prevState.sortType === "asc") {
        return {
          sortBy: type,
          sortType: "desc"
        };
      } else {
        return {
          sortBy: type,
          sortType: "asc"
        };
      }
    });
  };
  handlePageClick = e => {
    this.setState({ page: e.selected });
  };
  handleSort(data, sortBy, sortType) {
    if (sortType === "asc") {
      return data.sort(function(a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else if (sortType === "desc") {
      return data.sort(function(a, b) {
        return b[sortBy] - a[sortBy];
      });
    } else {
      return data;
    }
  }
  render() {
    let { sortBy, sortType, page, per_page } = this.state;
    let { data = [] } = this.props;
    let sortYearIcon = faSort;
    let sortScoreIcon = faSort;
    if (sortBy === "release_year") {
      sortYearIcon = icontype[sortType];
    } else if (sortBy === "score") {
      sortScoreIcon = icontype[sortType];
    }
    const data2Show = this.handleSort(data, sortBy, sortType);
    let data2Reander = data2Show.slice(per_page * page, per_page * (page + 1));
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>TITLE</th>
              <th>PLATFORM</th>
              <th>GENERE</th>
              <th data-type="release_year" onClick={this.handleClick}>
                RELEASE YEAR{" "}
                <FontAwesomeIcon data-type="year" icon={sortYearIcon} />
              </th>
              <th data-type="score" onClick={this.handleClick}>
                SCORE <FontAwesomeIcon data-type="score" icon={sortScoreIcon} />
              </th>
              <th>EDITORS CHOICE</th>
            </tr>
          </thead>
          <tbody>
            {data2Reander.map((datum, index) => {
              let {
                title = "",
                genre = "",
                release_year = "",
                platform = "",
                editors_choice = "",
                score = ""
              } = datum;
              return (
                <tr key={`${index}-games`}>
                  <td>{page * per_page + (index + 1)}</td>
                  <td>{title}</td>
                  <td>{platform}</td>
                  <td>{genre}</td>
                  <td>{release_year}</td>
                  <td>{score}</td>
                  <td>
                    {editors_choice === "Y" ? (
                      <span style={{ color: "green" }}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table_footer">
          <ReactPaginate
            previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
            nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(data.length / this.state.per_page)}
            marginPagesDisplayed={2}
            forcePage={page}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}
export default GamesTable;

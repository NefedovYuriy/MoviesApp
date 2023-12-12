import { React, Component } from 'react';
import { Pagination as AntPagination } from 'antd';

import './pagination.css';

export class Pagination extends Component {
  handleChange = (page) => {
    if (this.props.pageTab === 'search' && this.props.queryMovie) {
      this.props.searchPageMovie(this.props.queryMovie, page);
    }
    if (this.props.pageTab === 'search' && !this.props.queryMovie) {
      this.props.getPopularMovie(page);
    }
    if (this.props.pageTab === 'rated') {
      this.props.getPageSession(page);
    }
  };

  render() {
    const { totalPage, page } = this.props;
    return (
      <div className="pagination">
        <AntPagination
          className="pagination"
          current={page}
          pageSize={1}
          total={totalPage}
          showSizeChanger={false}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

import { React, Component } from 'react';
import { Rate } from 'antd';

import './rateStars.css';

export class RateStars extends Component {
  handleClickStars = (countStars) => {
    this.props.sendRateStars(this.props.id, countStars);
  };
  render() {
    const { stars } = this.props;
    return <Rate className="card__stars" defaultValue={stars} count={10} onChange={this.handleClickStars} />;
  }
}

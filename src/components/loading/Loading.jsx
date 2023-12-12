import { React, Component } from 'react';
import { Spin } from 'antd';

import './loading.css';

export class Loading extends Component {
  render() {
    return <Spin className="spin" size="large" />;
  }
}

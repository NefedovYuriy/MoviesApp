import { React, Component } from 'react';
import { Alert, Space } from 'antd';

export class ConnectionError extends Component {
  render() {
    const hasOnline = window.navigator.onLine;
    return !hasOnline ? (
      <Space
        direction="vertical"
        style={{
          display: 'block',
          margin: '10px auto',
          width: '90%',
          padding: '20px',
        }}
      >
        <Alert
          message="No internet connection"
          description="Please check your network settings"
          type="error"
          closable
          showIcon
        />
      </Space>
    ) : null;
  }
}

import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import './movieCard.css';

export function MovieCard() {
  return (
    <Card className="cardStyle" bodyStyle={{ padding: 0, overflow: 'hidden' }}>
      <Flex justify="space-between">
        <img alt="avatar" src="" className="imgStyle" />
        <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
          <Typography.Title level={3}>
            “antd is an enterprise-class UI design language and React UI library.”
          </Typography.Title>
          <Button type="primary" href="https://ant.design" target="_blank">
            Get Start
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

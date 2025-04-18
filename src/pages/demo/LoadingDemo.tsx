import React, { useState, useEffect } from 'react';
import { Button, Card, Space, Typography, Divider } from 'antd';
import LoadingScreen from '@/components/common/LoadingScreen';

const { Title, Paragraph } = Typography;

const LoadingDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fullScreenLoading, setFullScreenLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  
  // Simulate API call
  const simulateApiCall = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 3000); // 3 seconds delay to simulate API call
  };

  return (
    <div className="loading-demo-page">
      <Title level={2}>LoadingScreen Component Demo</Title>
      <Paragraph>
        Examples of how to use the LoadingScreen component in different scenarios
      </Paragraph>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Basic Loading */}
        <Card title="Basic Loading">
          <Paragraph>Simple loading spinner without content</Paragraph>
          <Button 
            type="primary" 
            onClick={() => simulateApiCall(setLoading)}
          >
            Show Loading
          </Button>
          <LoadingScreen spinning={loading} />
        </Card>

        {/* Full Screen Loading */}
        <Card title="Full Screen Loading">
          <Paragraph>Loading spinner that covers the entire screen</Paragraph>
          <Button 
            type="primary" 
            onClick={() => simulateApiCall(setFullScreenLoading)}
            danger
          >
            Show Full Screen Loading
          </Button>
          <LoadingScreen 
            spinning={fullScreenLoading} 
            fullScreen 
            tip="Processing your request..." 
          />
        </Card>

        {/* Content with Loading Overlay */}
        <Card title="Content with Loading Overlay">
          <Paragraph>Loading spinner that overlays existing content</Paragraph>
          <Button 
            type="primary" 
            onClick={() => simulateApiCall(setContentLoading)}
          >
            Reload Content
          </Button>
          <div style={{ marginTop: '20px' }}>
            <LoadingScreen spinning={contentLoading}>
              <Card>
                <Title level={4}>Content Area</Title>
                <Paragraph>
                  This content will be covered by the loading spinner when the "Reload Content" button is clicked.
                  The spinner will overlay this text while the simulated API call is in progress.
                </Paragraph>
              </Card>
            </LoadingScreen>
          </div>
        </Card>
      </Space>
    </div>
  );
};

export default LoadingDemo;
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './LoadingScreen.css';

interface LoadingScreenProps {
  spinning: boolean;
  fullScreen?: boolean;
  tip?: string;
  children?: React.ReactNode;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  spinning,
  fullScreen = false,
  tip = 'Loading...',
  children
}) => {
  // Custom spinner icon with larger size
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // If it's not spinning and there are no children, don't render anything
  if (!spinning && !children) {
    return null;
  }

  // If we're showing full screen loading without children
  if (fullScreen && spinning && !children) {
    return (
      <div className="fullscreen-spinner">
        <Spin indicator={antIcon} tip={tip} size="large" />
      </div>
    );
  }

  // For loading with content (overlay)
  return (
    <div className={spinning ? "loading-container" : ""}>
      <Spin 
        spinning={spinning} 
        indicator={antIcon} 
        tip={tip}
        size="large"
        wrapperClassName={fullScreen ? 'fullscreen-spinner' : ''}
      >
        {children || <div style={{ height: '80px' }} />}
      </Spin>
    </div>
  );
};

export default LoadingScreen;
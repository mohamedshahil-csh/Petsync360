import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/Images/Loading-1.json';
import Layout from './Layout';

const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Loading" }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen w-full text-gray-600 gap-4">
        <div className="w-32 h-32">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
        <div className="text-lg">{message}</div>
      </div>
    </Layout>
  );
};

export default LoadingScreen;

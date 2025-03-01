import React from 'react';

interface EncouragingMessageProps {
  message?: string;
}

const EncouragingMessage: React.FC<EncouragingMessageProps> = ({ message }) => {
  return (
    <div className={`flex items-center justify-center p-4 mb-4 space-x-2 text-center
     dark:bg-green-900 bg-green-400 dark:text-green-300 text-green-800 rounded-medium
     border border-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <span aria-label="thumbs up" role="img">👍</span>
      <span>{message || 'استمر في التقدم! أنت تقوم بعمل رائع!'}</span>
    </div>
  );
};

export default EncouragingMessage;

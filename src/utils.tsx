import React from 'react';
import { useLoading } from './context';

export const LoadingContainer: React.FC = ({ children }) => {
  const loading = useLoading();

  return <>{loading && children}</>;
};

export const LoadingConsumer: React.VFC<{ children: (loading: boolean) => React.ReactNode }> = ({ children }) => {
  const loading = useLoading();
  return <>{children(loading)}</>;
};

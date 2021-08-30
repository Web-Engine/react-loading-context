import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type LoadingContextType = {
  counter: number;
  increase: () => void;
  decrease: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingContextProvider: React.FC = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);

  const increase = useCallback(() => {
    setCounter((counter) => counter + 1);
  }, [setCounter]);

  const decrease = useCallback(() => {
    setCounter((counter) => counter - 1);
  }, [setCounter]);

  return <LoadingContext.Provider value={{ counter, increase, decrease }}>{children}</LoadingContext.Provider>;
};

export const useLoadingAction = () => {
  const [loading, setLoading] = useState<boolean>(false);
  useAutoLoading(loading);

  const start = useCallback(() => setLoading(true), [setLoading]);
  const stop = useCallback(() => setLoading(false), [setLoading]);
  const toggle = useCallback(() => setLoading((loading) => !loading), [setLoading]);

  return { start, stop, toggle };
};

export const useAutoLoading = (loading: boolean) => {
  const { increase: start, decrease: stop } = useContext(LoadingContext)!;

  useEffect(() => {
    if (!loading) return;

    start();

    return () => {
      stop();
    };
  }, [loading, start, stop]);
};

export const useLoading = (): boolean => {
  const { counter } = useContext(LoadingContext)!;

  return counter !== 0;
};

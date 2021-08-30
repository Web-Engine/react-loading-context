import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type LoadingContextType = {
  counter: number;
  start: () => void;
  stop: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingContextProvider: React.FC = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);

  const start = useCallback(() => {
    setCounter((counter) => counter + 1);
  }, [setCounter]);

  const stop = useCallback(() => {
    setCounter((counter) => counter - 1);
  }, [setCounter]);

  return <LoadingContext.Provider value={{ counter, start, stop }}>{children}</LoadingContext.Provider>;
};

export const useLoadingAction = () => {
  const { start, stop } = useContext(LoadingContext)!;

  return { start, stop };
};

export const useAutoLoading = (loading: boolean) => {
  const { start, stop } = useLoadingAction();

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

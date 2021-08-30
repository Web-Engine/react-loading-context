# React Loading Context

You can show your loading component anywhere.  
And only one loading component is showing at the same time.

## Quick Example

```tsx
const App = () => {
  return (
    <LoadingContextProvider>
      <LoadingContainer>
        <MyLoadingLayer />
      </LoadingContainer>
    </LoadingContextProvider>
  )
}

const SomeComponent = () => {
  const { data, loading, error } = someAsyncAction();
  useAutoLoading(loading);

  ...
};
```

## How to use

### 0. Install package
```sh
yarn add @gsts007/react-loading-context

or

npm install --save @gsts007/react-loading-context
```

### 1. Put LoadingContextProvider in your App or index
```tsx
import { LoadingContextProvider } from '@gsts007/react-loading-context';

ReactDOM.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

### 2. Setting your loading component

#### 2.1. Use `LoadingContainer`
`LoadingContainer` makes your loading component only shows when loading activated.

```tsx
const App = () => {
  return (
    <>
      ...others

      <LoadingContainer>
        <MyLoadingComponent />
      </LoadingContainer>
    </>
  );
}
```

#### 2.2. Use `useLoading` hooks
You can get loading value using `useLoading` hooks.

```tsx
const App = () => {
  const loading = useLoading();

  return (
    <>
      ...others

      {loading && <MyLoadingComponent>}
      {/* or <MyLoadingComponent show={loading} /> */}
    </>
  );
};
```

#### 2.3. Use `LoadingConsumer`
If you don't want to hooks, you can use `LoadingConsumer`.

```tsx
const App = () => {
  return (
    <>
      ...others

      <LoadingConsumer>
        {loading => <MyLoadingComponent show={loading} />}
      </LoadingConsumer>
    </>
  );
};
```

### 3. Use loading actions or auto loading

#### 3.1. use `useLoadingAction`
You can manually activate loading with `useLoadingAction`.
```tsx
const { start, stop } = useLoadingAction();

useEffect(() => {
  start();

  const timer = setTimeout(() => {
    stop();
  }, 1000);

  return () => {
    clearTimeout(timer);
    stop();
  };
}, [start, stop]);
```

#### 3.2 use `useAutoLoading`
You might have a `loading` variable if you use `redux-thunk`, `apollo-client`, or etc.  
then, you can use `useAutoLoading` for activate and deactivate loading easily.

```tsx
const { data, loading, error } = useQuery(...);
useAutoLoading(loading);
```

## Don't worry about using multiple loading
React Loading Context use `loading counter` system.

the loading action `start` means "increase the `loading counter`"  
and also `stop` means "decrease the `loading counter`"  
and we activate loading using whether loading counter is `0`.

So, We shows loading component when any one loading in progress.

## API References
### Hooks

#### useLoading

Get loading activation state

```tsx
useLoading(): boolean

const loading = useLoading();
```

#### useAutoLoading

Automatically activate and deactivate loading using boolean parameter
```tsx
useAutoLoading(loading: boolean): void

const { data, loading, error } = useSelector(state => state.asyncState);
useAutoLoading(loading);
```

#### useLoadingAction
Get actions for loading.  
We recommend to use destructuring when use this hook.

```tsx
useLoadingAction(): {
  start: () => void;
  stop: () => void;
};

const { start, stop } = useLoadingAction();
```

### Utility components

#### LoadingContainer
Show children when loading activated

```tsx
LoadingComponent: React.FC

<LoadingComponent>
  This text is showing when loading
</LoadingComponent>
```


#### LoadingConsumer
```tsx
LoadingConsumer: React.VFC<{ children: (loading: boolean) => React.ReactNode }>

<LoadingConsumer>
  {loading => <Modal show={loading}>Loading...</Modal>}
</LoadingConsumer>
```

import { createContext, useState } from 'react';

export const UiContext = createContext<[{ isNavOpen: boolean }, any]>([
  {
    isNavOpen: false,
  },
  () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
]);
// Create a provider for components to consume and subscribe to changes
export const UiStateProvider = (props: any) => {
  const [state, setState] = useState({ isNavOpen: false });
  return (
    <UiContext.Provider value={[state, setState] as any}>
      {props.children}
    </UiContext.Provider>
  );
};

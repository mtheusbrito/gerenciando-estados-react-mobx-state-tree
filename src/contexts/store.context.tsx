import {createContext, ReactNode} from 'react';


export const StoreContext = createContext<string>('something');
interface  StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({children }: StoreProviderProps): JSX.Element =>
	<StoreContext.Provider value={'something'}>{children}</StoreContext.Provider>;

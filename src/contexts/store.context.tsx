import {createContext, ReactNode, useContext} from 'react';

import {  rootStore, RootStoreType } from 'src/stores/root.store';


export const StoreContext = createContext<RootStoreType | undefined>(undefined);
interface  StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({children }: StoreProviderProps): JSX.Element =>
	<StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;

export const useStore = () => useContext(StoreContext) as RootStoreType;



import {createContext, ReactNode, useContext} from 'react';

import {  userStore, UserStoreType } from 'src/stores/user.store';


export const StoreContext = createContext<UserStoreType | undefined>(undefined);
interface  StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({children }: StoreProviderProps): JSX.Element =>
	<StoreContext.Provider value={userStore}>{children}</StoreContext.Provider>;

export const useStore = () => useContext(StoreContext) as UserStoreType;



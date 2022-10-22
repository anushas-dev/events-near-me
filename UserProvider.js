import React, { useContext } from 'react';
import { useUserData } from '@nhost/nextjs'
const UserContext = React.createContext(null);

export function UserProvider({ children = null }) {
  const user = useUserData()
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

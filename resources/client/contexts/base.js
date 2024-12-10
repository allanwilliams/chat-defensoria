import React, { createContext, useState, useEffect, useContext } from 'react';
import debounce from 'lodash.debounce';

const BaseContext = createContext({});

export const BaseProvider = ({ children }) => {

  
  const [user, setUser] = useState({id:1,nome: 'Allan'})


  return (
    <BaseContext.Provider 
      value={{ 
          user,
          setUser,
      }}>
        {children}
    </BaseContext.Provider>
  );
}

export function useBase() {
  const context = useContext(BaseContext)
  return context;
};

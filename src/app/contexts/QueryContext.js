import { useEffect } from 'react';
import { createContext, useState } from 'react';

const QueryContext = createContext({
  cardList: [],
  setCardList: () => {},
});

export const QueryProvider = ({ children }) => {
    const [drivers, setDrivers] = useState([]);
    return (
        <QueryContext.Provider
            value={{ cardList: drivers, setCardList: setDrivers }}
        >
            {children}
        </QueryContext.Provider>
    );
};

export default QueryContext;

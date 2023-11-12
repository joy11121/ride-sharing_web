import { useEffect } from 'react';
import { createContext, useState } from 'react';

const PostContext = createContext({
  cardList: [],
  setCardList: () => {},
});

export const PostProvider = ({ children }) => {
    const [drivers, setDrivers] = useState([]);
    return (
        <PostContext.Provider
            value={{ cardList: drivers, setCardList: setDrivers }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostContext;

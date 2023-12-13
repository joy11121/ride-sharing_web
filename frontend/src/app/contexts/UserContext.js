import { useEffect } from 'react';
import { createContext, useState } from 'react';
import dayjs from 'dayjs';

const UserContext = createContext({
  timeValue: "",
  setTimeValue: () => {},
  myPos: "",
  setMyPos:  () => {},
  myDest: "",
  setMyDest:  () => {},
});

export const UserProvider = ({ children }) => {

    const [timeValue, setTimeValue] = useState(dayjs());
    const [myPos, setMyPos] = useState("");
    const [myDest, setMyDest] = useState("");

    return (
        <UserContext.Provider
            value={{ 
                timeValue, setTimeValue,
                myPos, setMyPos,
                myDest, setMyDest,
             }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;

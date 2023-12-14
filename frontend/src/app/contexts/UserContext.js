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
  id:"", setId: () => {},
  name:"", setName: () => {},
  gender:"", setGender: () => {},
  title:"", setTitle: () => {},
  email: "", setEmail: () => {},
});

export const UserProvider = ({ children }) => {

    const [timeValue, setTimeValue] = useState(dayjs());
    const [myPos, setMyPos] = useState("");
    const [myDest, setMyDest] = useState("");

    // User data
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");

    return (
        <UserContext.Provider
            value={{ 
                timeValue, setTimeValue,
                myPos, setMyPos,
                myDest, setMyDest,
                id, setId,
                name, setName,
                gender, setGender,
                title, setTitle,
                email, setEmail,
             }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;

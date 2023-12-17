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
  needTableUpdate: false, setNeedTableUpdate: () => {}
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

    const [needTableUpdate, setNeedTableUpdate] = useState(false);

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
                needTableUpdate, setNeedTableUpdate,
             }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;

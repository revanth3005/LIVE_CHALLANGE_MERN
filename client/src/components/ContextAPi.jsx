import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const UserContext = createContext();

const ContextAPi = (props) => {
  const [logState, setLogState] = useState("Login");
  const [userState, setUserState] = useState(false);

  const ctxValues = useMemo(() => {
    return { logState, setLogState, userState, setUserState };
  }, [logState, userState]);

  return (
    <UserContext.Provider value={ctxValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextAPi;

//short

export const useUserContext = () => {
  return useContext(UserContext);
};

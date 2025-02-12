import { createContext, useContext, useState } from "react";
import { ThemeContext } from "styled-components";

interface GlobalData {
  accessToken?: string;
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps)

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({children}: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});

  return (
    <ThemeContext.Provider value={{globalData, setGlobalData}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const setAccessToken = (accessToken: string) => {
    setGlobalData({
      ...globalData,
      accessToken
    })
  }

  return {
    accessToken: globalData?.accessToken,
    setAccessToken,
  }
} 
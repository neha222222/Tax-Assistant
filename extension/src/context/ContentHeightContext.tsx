import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface ChildrenProps{
  children: ReactNode
}

interface ContentHeightProps{
   contentHeight: number; 
   setContentHeight: React.Dispatch<React.SetStateAction<number>>
}

const ContentHeightContext = createContext<ContentHeightProps>({
  contentHeight: 500,
  setContentHeight: () => {},
});

export const ContentHeightProvider:React.FC<ChildrenProps> = ({children}) =>  {

  const [contentHeight,setContentHeight] = useState(500)

  useEffect(() => { 

    const port = chrome.runtime.connect({ name: 'window-tracking' });

    port.onDisconnect.addListener(() => {
      port.disconnect();
      window.removeEventListener('resize', handleResize);
    });

    port.postMessage({ action: 'windowResized' });

    port.onMessage.addListener((response: any) => {
      setContentHeight(() => response.height)
    });

    const handleResize = () => {
      port.postMessage({ action: 'windowResized' });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      port.disconnect();
      window.removeEventListener('resize', handleResize);
    };  
  }, []);

  const contextValue = { contentHeight, setContentHeight };


  return (
    <ContentHeightContext.Provider value={contextValue}>
        {children}
    </ContentHeightContext.Provider>
    )
}


export const useContentHeight = () => useContext(ContentHeightContext)
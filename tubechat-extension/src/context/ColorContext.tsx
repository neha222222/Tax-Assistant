import React, { ReactNode, createContext, useContext, useState } from 'react'

interface ChildrenProps{
    children: ReactNode
}

interface ColorContextProps{
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorContext = createContext<ColorContextProps>({
    color: '#EA384D',
    setColor: () => {}
})

export const ColorContextProvider:React.FC<ChildrenProps> = ({children}) => {

    const [color,setColor] = useState(() => {
        const storedValue = localStorage.getItem('extension-main-color');
        return storedValue ? storedValue : '#EA384D';
      })

    return (
        <ColorContext.Provider value={{color,setColor}}>
            {children}
        </ColorContext.Provider>
    )
}

export const useColor = () => useContext(ColorContext)
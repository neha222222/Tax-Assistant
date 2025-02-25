import React from 'react'

interface TextBoxProps{
    fontWeight: number,
    lineHeight: string,
    fontSize: string,
    content: string
}

const TextBox:React.FC<TextBoxProps> = ({fontSize,lineHeight,fontWeight,content}) => {
  return (
    <div>
      <p style={{fontSize: fontSize, lineHeight:lineHeight,fontWeight: fontWeight}}>
        {content}
      </p>
    </div>
  )
}

export default TextBox

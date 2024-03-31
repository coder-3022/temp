import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div>
        white wala text isme daalna h about us ka
        <HighlightText text={"combines technology"}/>
        <span className=' text-brown-500'>
            {" "}
            expertise
        </span>
        , phir se yaha white text wala daalna h

        <span className=' text-brown-500'>
            {" "}
            unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote
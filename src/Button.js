import React from 'react'

export default function Button(props) {
  return (
    <div>
        <button className='btn btn-primary' onClick={()=>props.onChange()}>{props.text}</button>
    </div>
  )
}

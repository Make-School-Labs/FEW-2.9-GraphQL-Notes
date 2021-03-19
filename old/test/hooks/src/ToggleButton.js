import React from 'react'

const ToggleButton = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.on ? 'On' : 'Off'}
    </button>
  )
}

export default ToggleButton
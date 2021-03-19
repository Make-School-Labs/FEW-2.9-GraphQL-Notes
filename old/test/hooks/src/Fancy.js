import React, { useState } from 'react'
import ReactCSSTransitionGRoup from 'react-addons-css-transition-group'
import './Fancy.css'

const Fancy = (props) => {
  const [on, setOn] = useState(false)

  return (
    <ReactCSSTransitionGRoup
      transitionName="fancy"
      transitionAppear={true}
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={1000}
      transitionAppearTimeout={1000}
    >
      <div key="message-container">
        <h1 key="message-label">Fancy Hello</h1>
      </div>
    </ReactCSSTransitionGRoup>
  )
}

export default Fancy
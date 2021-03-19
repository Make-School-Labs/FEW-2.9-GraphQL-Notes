import React, { Component, useState } from 'react';
import ToggleButton from './ToggleButton'

function HooksExample() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(99);
  const [on, setOn] = useState(true);
  const [widget, setWidget] = useState({ a:11, b: 22 })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Add one
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>

      <button onClick={() => setCount(count - 1)}>
        Subtract one
      </button>

      <ToggleButton onClick={() => setOn(!on)} on={on}/>

      <button onClick={() => setOn(!on)}>
        {on ? 'On' : 'Off'}
      </button>
    </div>
  );
}

export default HooksExample
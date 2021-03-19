/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

const Counter = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        You clicked
        {count}
        times
      </p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter

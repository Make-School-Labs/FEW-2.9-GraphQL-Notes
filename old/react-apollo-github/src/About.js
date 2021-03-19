import React, { useState } from 'react'

const About = () => {
  const [test, setTest] = useState('Hello')

  return (
    <div>
      <h1>About</h1>
      <p>This is a test of Apollo and GraphQL.</p>

    </div>
  )
}

export default About
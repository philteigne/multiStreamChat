import logo from './logo.svg';
import './App.css';

import React from 'react'
import

function App() {

  const messageArray = ['a', 'b', 'c'];

  return (
    <React.Fragment>
      proce
      {messageArray.map((a) => <div>{a}</div>)}
    </React.Fragment>
  );
}

export default App;

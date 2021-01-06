import './App.css';
import MainPage from './components/MainPage/MainPage';
import React, { useState } from "react";

const App = () => {
  const [user, setUser] = useState({id: -1})

  return (  
    <div className="App">
      <MainPage user={user} setUser={setUser}/>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react'; // Importez useEffect en plus
import logo from './logo.svg';
import './App.css';

function App() {

  const [msg, setMsg] = useState('');

  // Utilisez useEffect pour charger les données dès que le composant est monté
  useEffect(() => {
    const fetchData = async () => {
      const data = await window.fetch('/api/test');
      const json = await data.json();
      const msg = json.msg;
  
      setMsg(msg);
    };
  
    fetchData(); // Appelez fetchData ici pour exécuter la fonction
  }, []); // Le tableau vide signifie que cet effet ne dépend d'aucune variable et ne s'exécutera qu'une fois, au montage du composant

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* Le bouton n'est plus nécessaire car le message est chargé au montage */}
        <p>{msg}</p>
      </header>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FondList() {
  const [fonds, setFonds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/fond')
      .then(response => setFonds(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Fonds</h1>
      <ul>
        {fonds.map(fond => (
          <li key={fond.sifra}>{fond.naziv} - {fond.iznos_sredstava}</li>
        ))}
      </ul>
    </div>
  );
}

export default FondList;
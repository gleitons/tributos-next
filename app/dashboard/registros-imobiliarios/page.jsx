'use client';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/imoveis')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Erro ao carregar CSV', error));
  }, []);
  console.log(data.split('\n'));
  return (
    <div>
      {data.map((row, index) => (
        <div key={index}>
           
          {Object.values(row).join(', ')} 
        </div>
      ))}
    </div>
  );
}

export default MyComponent;

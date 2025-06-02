import { useEffect, useState } from 'react';

function DataDisplay() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")  // Using proxy (make sure backend has this endpoint)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Data from Backend:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplay;
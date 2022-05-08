import React from 'react';
import './App.css';
import 'h8k-components';
import { useEffect, useCallback, useState } from 'react';


const title = "Movie List";
const apiEndpoint = 'https://jsonmock.hackerrank.com/api/movies';

function App() {
  const [apiQuery, setApiQuery] = useState('');

  const onChange = useCallback((event) => {
    const query = event.target.value;
    console.log(query);
    if (query.length > 0) {
      setApiQuery(query);
    }
  }, []);

  const getApiData = async () => {
    await fetch(apiEndpoint, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        (async () => {
          const stream = await result.body.getReader();

          while (true) {
            const { data, endOfStream } = await stream.read();

            if (endOfStream) {
              break;
            }
            console.log(data);

          }
        })();
      })
      .catch((error) => {
        console.error(error.message)
      });
  }

  useEffect(() => {
    document.title = title;
  });

  useEffect(() => {
    getApiData().then(result => {
      console.log(result);
    });


  }, [apiQuery]);

  return (
    <div>
      <input onChange={onChange}
        type="number"
        value={apiQuery} />
    </div>
  );
}

export default App;

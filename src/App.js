import './App.css';
import 'h8k-components';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const title = 'Movie List';
const apiEndpoint = 'https://jsonmock.hackerrank.com/api/movies';

function App() {
  let [currentPage, setCurrentPage] = useState(1);
  let [movies, setMovies] = useState([]);
  const [apiQuery, setApiQuery] = useState('');
  const [toggleVisibility, setToggleVisibility] = useState('none');
  const resultsRef = useRef();

  const getApiData = async () => {
    // console.log('getApiData', apiQuery);
    await fetch(
      apiEndpoint +
        '?' +
        new URLSearchParams({
          Year: apiQuery,
          page: currentPage,
        }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        // clone previous state for movies
        const previousMovies = [...movies];
        // filter results by year
        const moviesFiltred = response.data.filter((item) => {
          return item.Year === apiQuery;
        });

        // Toggle visibilite when there are no results
        if (moviesFiltred.length === 0) {
          setToggleVisibility('block');
        }
        // Hide "No results" after 3s
        setTimeout(() => {
          setToggleVisibility('none');
        }, 3000);

        // prepend list of movies
        setMovies([...moviesFiltred, ...previousMovies]);
        // increase page number
        setCurrentPage(currentPage + 1);
      })
      .catch((error) => console.error);
  };

  const onChange = useCallback(
    (event) => {
      const query = event.target.value;
      // console.log(query);

      if (query !== apiQuery) {
        // reset to default states
        setCurrentPage(1);
        setMovies([]);
      }

      if (query.length > 0) {
        // cast input value to integer
        setApiQuery(parseInt(query));
      } else {
        setApiQuery('');
      }
    },
    [apiQuery],
  );

  const onSearch = () => {
    // console.log('onSearch', apiQuery);
    // ignore number with a length smaller then 4 digits
    if (apiQuery <= 1000 || apiQuery > 9999) {
      return;
    }

    getApiData();
  };

  useEffect(() => {
    document.title = title;
  });

  return (
    <div>
      <h8k-navbar header={title} />
      <div className="layout-column align-items-center mt-50">
        <div className="layout-row align-items-center">
          <input
            className="w-50"
            onChange={onChange}
            type="number"
            value={apiQuery}
            placeholder="Enter Year eg 1995"
            min="1000"
          />
          <button onClick={onSearch} className="small">
            Search
          </button>
        </div>
        {movies && (
          <div ref={resultsRef} className={`${toggleVisibility} mt-50`}>
            No Results Found
          </div>
        )}

        {movies && movies.length > 0 && (
          <ul className="styled">
            {movies.map((movie) => (
              <li key={`movie-${movie.imdbID}`}>{movie.Title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

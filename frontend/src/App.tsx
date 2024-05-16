import React, {useRef, useState, useEffect} from 'react';
import './App.css';
import { Search } from 'react-bootstrap-icons';

function App() {

    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [startPage, setStartPage] = useState<number>(1);

    const research = (page?: number) => {
        setLoading(true);
        setNumPages(0)
        setStartPage(1);

        const actualPage = page ?? 1;
        setCurrentPage(actualPage);

        const inputValue = inputRef.current?.value;
        const endpoint = inputValue ? `api/match?match=${inputValue}&from=${actualPage}` : `api/match-all?page=${actualPage}`;

        return fetch(`http://localhost:3000/${endpoint}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
                setNumPages(Math.ceil(data.hits.total.value / 20));
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        research();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            research();
        }
    };

    return (
        <div className="App">
            <div className="top">
                <input
                    type="text"
                    ref={inputRef}
                    className="top-field"
                    placeholder="Search"
                    onKeyDown={handleKeyDown}
                />
                <button onClick={() => research()} className="top-btn"><Search/></button>
            </div>
            <div className="big-box">
                {loading ? (
                    <p>Loading...</p>
                ) : !data || data.hits.hits.length === 0 ? (
                    <p>No data</p>
                ) : (
                    data.hits.hits.map((hit: any, index: number) => (
                        <div className="box" key={index}>
                            <h2>{hit._source.location}</h2>
                            <p>Country: {hit._source.country}</p>
                            <p>Date and Time: {hit._source.date_time}</p>
                            <p>Magnitude: {hit._source.magnitude}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="pagination">
                {startPage > 1 ? (
                    <button
                        onClick={() => setStartPage(prev => prev - 1)}
                        className="pagination-button">
                        &lt;
                    </button>
                ) : numPages > 8 ? (
                    <button disabled className="pagination-button disabled-button">
                        &lt;
                    </button>
                ) : null}
                {Array.from({length: Math.min(numPages, 8)}, (_, page) => (
                    <button
                        key={page}
                        onClick={() => research(startPage + page)}
                        className={`pagination-button ${currentPage === startPage + page ? 'selected-page' : ''}`}>
                        {startPage + page}
                    </button>
                ))}
                {startPage + 7 < numPages ? (
                    <button
                        onClick={() => setStartPage(prev => prev + 1)}
                        className="pagination-button">
                        &gt;
                    </button>
                ) : numPages > 8 ? (
                    <button disabled className="pagination-button disabled-button">
                        &gt;
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default App;
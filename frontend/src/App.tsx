import React, {useRef, useState, useEffect} from 'react';
import './App.css';
import { Search } from 'react-bootstrap-icons';

function App() {

    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false); // Ajoutez un état pour le chargement

    const research = () => {

        setLoading(true);
        const inputValue = inputRef.current?.value;
        const endpoint = inputValue ? `api/match?match=${inputValue}` : 'api/match-all';

        return fetch(`http://localhost:3000/${endpoint}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log data to console
                setData(data);
                setLoading(false);
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
                <button onClick={research} className="top-btn"><Search/></button>
            </div>
            <div className="big-box">
                {loading ? (
                    <p>Loading...</p> // Affichez "Loading..." lorsque le chargement est true
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
        </div>
    );
}

export default App;
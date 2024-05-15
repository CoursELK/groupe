import React, {useRef, useState, useEffect} from 'react';
import './App.css';

interface Source {
    number: string;
    forename: string;
    code: string;
    "@timestamp": string;
    driverId: number;
    driverRef: string;
    nationality: string;
    surname: string;
    dob: string;
    url: string;
}

interface Hit {
    _index: string;
    _id: string;
    _score: number;
    _source: Source;
}

interface Hits {
    total: {
        value: number;
        relation: string;
    };
    max_score: number;
    hits: Hit[];
}

interface Data {
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: Hits;
}

function App() {
    const [data, setData] = useState<Data | null>(null);
    const inputRef = useRef(null);

    const research = () => {
        return new Promise<Data>((resolve) => {
            resolve({
                "took": 1,
                "timed_out": false,
                "_shards": {
                    "total": 1,
                    "successful": 1,
                    "skipped": 0,
                    "failed": 0
                },
                "hits": {
                    "total": {
                        "value": 857,
                        "relation": "eq"
                    },
                    "max_score": 1.0,
                    "hits": [
                        {
                            "_index": "drivers",
                            "_id": "DVwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "44",
                                "forename": "Lewis",
                                "code": "HAM",
                                "@timestamp": "1985-01-07T00:00:00.000+01:00",
                                "driverId": 1,
                                "driverRef": "hamilton",
                                "nationality": "British",
                                "surname": "Hamilton",
                                "dob": "1985-01-07",
                                "url": "http://en.wikipedia.org/wiki/Lewis_Hamilton"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "DlwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "\\N",
                                "forename": "Nick",
                                "code": "HEI",
                                "@timestamp": "1977-05-10T00:00:00.000+02:00",
                                "driverId": 2,
                                "driverRef": "heidfeld",
                                "nationality": "German",
                                "surname": "Heidfeld",
                                "dob": "1977-05-10",
                                "url": "http://en.wikipedia.org/wiki/Nick_Heidfeld"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "D1wMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "6",
                                "forename": "Nico",
                                "code": "ROS",
                                "@timestamp": "1985-06-27T00:00:00.000+02:00",
                                "driverId": 3,
                                "driverRef": "rosberg",
                                "nationality": "German",
                                "surname": "Rosberg",
                                "dob": "1985-06-27",
                                "url": "http://en.wikipedia.org/wiki/Nico_Rosberg"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "EFwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "14",
                                "forename": "Fernando",
                                "code": "ALO",
                                "@timestamp": "1981-07-29T00:00:00.000+02:00",
                                "driverId": 4,
                                "driverRef": "alonso",
                                "nationality": "Spanish",
                                "surname": "Alonso",
                                "dob": "1981-07-29",
                                "url": "http://en.wikipedia.org/wiki/Fernando_Alonso"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "EVwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "\\N",
                                "forename": "Heikki",
                                "code": "KOV",
                                "@timestamp": "1981-10-19T00:00:00.000+01:00",
                                "driverId": 5,
                                "driverRef": "kovalainen",
                                "nationality": "Finnish",
                                "surname": "Kovalainen",
                                "dob": "1981-10-19",
                                "url": "http://en.wikipedia.org/wiki/Heikki_Kovalainen"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "ElwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "\\N",
                                "forename": "Kazuki",
                                "code": "NAK",
                                "@timestamp": "1985-01-11T00:00:00.000+01:00",
                                "driverId": 6,
                                "driverRef": "nakajima",
                                "nationality": "Japanese",
                                "surname": "Nakajima",
                                "dob": "1985-01-11",
                                "url": "http://en.wikipedia.org/wiki/Kazuki_Nakajima"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "E1wMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "\\N",
                                "forename": "Sébastien",
                                "code": "BOU",
                                "@timestamp": "1979-02-28T00:00:00.000+01:00",
                                "driverId": 7,
                                "driverRef": "bourdais",
                                "nationality": "French",
                                "surname": "Bourdais",
                                "dob": "1979-02-28",
                                "url": "http://en.wikipedia.org/wiki/S%C3%A9bastien_Bourdais"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "FFwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "7",
                                "forename": "Kimi",
                                "code": "RAI",
                                "@timestamp": "1979-10-17T00:00:00.000+01:00",
                                "driverId": 8,
                                "driverRef": "raikkonen",
                                "nationality": "Finnish",
                                "surname": "Räikkönen",
                                "dob": "1979-10-17",
                                "url": "http://en.wikipedia.org/wiki/Kimi_R%C3%A4ikk%C3%B6nen"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "FVwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "88",
                                "forename": "Robert",
                                "code": "KUB",
                                "@timestamp": "1984-12-07T00:00:00.000+01:00",
                                "driverId": 9,
                                "driverRef": "kubica",
                                "nationality": "Polish",
                                "surname": "Kubica",
                                "dob": "1984-12-07",
                                "url": "http://en.wikipedia.org/wiki/Robert_Kubica"
                            }
                        },
                        {
                            "_index": "drivers",
                            "_id": "FlwMdo8BD_0GMj7aLEVf",
                            "_score": 1.0,
                            "_source": {
                                "number": "\\N",
                                "forename": "Timo",
                                "code": "GLO",
                                "@timestamp": "1982-03-18T00:00:00.000+01:00",
                                "driverId": 10,
                                "driverRef": "glock",
                                "nationality": "German",
                                "surname": "Glock",
                                "dob": "1982-03-18",
                                "url": "http://en.wikipedia.org/wiki/Timo_Glock"
                            }
                        }
                    ]
                }
            });
        });
    };

    const handleClick = () => {
        research().then(data => {
            setData(data);
        });
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <div className="App">
            <input ref={inputRef} type="text" className="top-field" placeholder="Search"/>
            <div className="big-box">
                {!data ? (
                    <p>Aucune donnée</p>
                ) : (
                    data.hits.hits.map((hit: Hit, index: number) => (
                        <div className="box" key={index}>
                            <h2>{hit._source.forename} {hit._source.surname}</h2>
                            <p>Number: {hit._source.number}</p>
                            <p>Code: {hit._source.code}</p>
                            <p>Nationality: {hit._source.nationality}</p>
                            <p>Date of Birth: {hit._source.dob}</p>
                            <a href={hit._source.url} target="_blank" rel="noopener noreferrer">Wikipedia Link</a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
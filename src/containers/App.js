import React, { useState, useEffect } from 'react';
import ErrorBoundry from '../components/ErrorBoundry';
import CardList from '../components/CardList';
import Scrool from '../components/Scrool';
import SearchBox from '../components/SearchBox';
import './App.css';

function App() {

    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
    }, [])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return !robots.length ?
        <h1>Loading</h1>
    :
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={ onSearchChange } />
            <Scrool>
                <ErrorBoundry>
                    <CardList robots={ filteredRobots } />
                </ErrorBoundry>
            </Scrool>
        </div>
}

export default App;

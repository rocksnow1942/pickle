import React, { useState } from 'react'
import {ipcRenderer} from 'electron'
import Button from 'react-bootstrap/Button'
import {Doughnut} from 'react-chartjs-2'
import BarChart from './BarChart'
import TestChart from './TestChart'

var d3 = require('d3')

function App () {
    const [clickCount,setClickCount] = useState(0)
    function click(e) {
        setClickCount(clickCount+1)
        ipcRenderer.send('click:increase',{clickCount})
        

    }
    let data = {
        datasets: [{
            data: [10, 20, 30]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };

    let options = {
        backgroundColor:['rgba(0.2,0.1,0.4,0.5)','red','yellow']
    }
   
    return (
        <div className='app'>
            <h1>React Electron Boilerplate {clickCount}</h1>
            <Button variant='primary' id='mybutton' onClick={click}>click me</Button>{' '}
            <Doughnut id='graph' data={data} options={options} />
            <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
            <TestChart count={clickCount}></TestChart>
        </div>
    )
}






export default App
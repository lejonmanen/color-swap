import { useState, useRef } from 'react'
import { randomizeMap } from '../utils'
import './App.css'

function App() {
    const [turn, setTurn] = useState(0)
    const [lastColor, setLastColor] = useState('')
    const [palette, setPalette] = useState(['#FFE1E9', '#A6A2F6', '#AF8336', '#65BD6F'])
    const SIZEX=7, SIZEY=10, SIZEEM='1.8em'
    const startX = 1, startY = 2
    const matrix = useRef(randomizeMap(palette.length, SIZEX, SIZEY, startX, startY))

    const edge = []  // TODO add all tiles adjacent to an owned tile

    const pickColor = c => {
        console.log('Chose color ', c);
        // TODO change color of every owned tile
        matrix.current.data.forEach(cs => {
            console.log('Looping ', cs);
            if( cs[1] ) cs[0] = c
        })
        setLastColor(c)
    }

    const gridStyle = { gridTemplateColumns: `repeat(${SIZEX}, ${SIZEEM})`, gridTemplateRows: `repeat(${SIZEY}, ${SIZEEM})` }

    return (
        <div className="App">
        <header className="App-header">
            Color swap
        </header>
        <main>
        <section className="grid"  style={gridStyle}>
            {matrix.current.data.map(([c, owned], i) => (
                <div key={i} className={owned?'owned':''} style={{ backgroundColor: palette[c] }} onClick={null}> </div>
            ))}
        </section>

        <section className="color-section">
        {palette.map((p, i) => (
            <button className="color-button" key={p} style={{ backgroundColor: p }} disabled={lastColor==p} onClick={() => pickColor(i)}> </button>
        ))}
        </section>
        </main>

        <footer>
        </footer>
        </div>
    )
}

export default App

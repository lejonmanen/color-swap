import { useState, useRef } from 'react'
import { randomizeMap, findArea, colorChange, checkVictory } from '../utils'
import Settings from './Settings'
import './App.css'

const PLAYING = 1, VICTORY = 2

function App() {
    const [turn, setTurn] = useState(0)
    const [showSettings, setShowSettings] = useState(false)
    const [state, setState] = useState(PLAYING)
    const [history, setHistory] = useState([])
    const [palette, setPalette] = useState(['#FFE1E9', '#A6A2F6', '#AF8336', '#65BD6F'])
    const SIZEX=7, SIZEY=10, SIZEEM='1.8em'
    const startX = Math.floor(SIZEX / 2), startY = Math.floor(SIZEY / 2)
    const matrix = useRef(randomMap())
    const [lastColor, setLastColor] = useState(matrix.current.get(startX, startY)[0])

    function randomMap() {
        return randomizeMap(palette.length, SIZEX, SIZEY, startX, startY)
    }

    const pickColor = c => {
        // console.log('Chose color ', c);
        let area = findArea(matrix.current, startX, startY)
        // console.log('pickColor area', area);
        colorChange(matrix.current, area, c)
        // console.log('pickColor 2');
        setLastColor(c)
        let thisTurn = turn
        setTurn(t => t + 1)

        if( checkVictory(matrix.current) ) {
            setState(VICTORY)
            history.push(`Won in ${thisTurn + 1} moves.`)
        }
    }

    const newGame = () => {
        matrix.current = randomMap()
        setState(PLAYING)
        setTurn(0)
    }
    const restart = () => {
        for(let x=0; x<SIZEX; x++) {
    		for(let y=0; y<SIZEY; y++) {
                if( x !== startX || y !== startY ) {
                    let p = matrix.current.get(x, y)
                    p.owned = false
                }
            }
        }
        setState(PLAYING)
        setTurn(0)
    }

    const gridStyle = { gridTemplateColumns: `repeat(${SIZEX}, ${SIZEEM})`, gridTemplateRows: `repeat(${SIZEY}, ${SIZEEM})` }

    return (
        <div className="App">
        <header className="App-header">
            Color swap
            <button onClick={() => setShowSettings(s => !s)}> ⚙️ </button>
        </header>
        TODO: 1) gear button absolute position, 2) findArea does not find entire area all the time, 3) seeded random to save level codes, 4) load level by code
        {showSettings ? (
            <main>
            <Settings />
            </main>
        ) : (
            <main>
            <section className="grid"  style={gridStyle}>
                {matrix.current.data.map(([c, owned], i) => (
                    <div key={i} className={owned?'owned':''} style={{ backgroundColor: palette[c] }} onClick={null}> </div>
                ))}
            </section>

            <section className="color-section">
            {palette.map((p, i) => (
                <button className="color-button" key={p} style={{ backgroundColor: p }} disabled={lastColor==i || state==VICTORY} onClick={() => pickColor(i)}> </button>
            ))}
            </section>

            <section>
            {turn} moves
            {state===VICTORY && (
                <><br /> You won! <br/>
                <button onClick={newGame}> Start new game </button>
                {/*<button onClick={restart}> Restart </button>*/}
                </>
            )}
            </section>

            <section>
            {history.map((h, i) => (
                <p key={i}> {h} </p>
            ))}
            </section>
            </main>
        )}

        <footer>
        </footer>
        </div>
    )
}

export default App

import { useState, useRef } from 'react'
import { randomizeMap, findArea, colorChange, checkVictory } from '../utils'
import Settings from './Settings'
import './App.scss'

const PLAYING = 1, VICTORY = 2

function App() {
    const [seed, setSeed] = useState(1)
    const [turn, setTurn] = useState(0)
    const [score, setScore] = useState(0)
    const [showSettings, setShowSettings] = useState(false)
    const [state, setState] = useState(PLAYING)
    const [history, setHistory] = useState([])
    const [palette, setPalette] = useState(['#FFE1E9', '#A6A2F6', '#AF8336', '#65BD6F'])
    const SIZEX=7, SIZEY=10, SIZEEM='1.8em'
    const startX = Math.floor(SIZEX / 2), startY = Math.floor(SIZEY / 2)
    const matrix = useRef(randomMap())
    const [lastColor, setLastColor] = useState(matrix.current.get(startX, startY)[0])

    function randomMap() {
        return randomizeMap(palette.length, SIZEX, SIZEY, startX, startY, seed)
    }

    const pickColor = c => {
        // console.log('Chose color ', c);
        const p = matrix.current.get(startX, startY)
        let swapped = findArea(matrix.current, startX, startY, c)
        let newScore = score + swapped**2
        setScore(s => newScore)
        setLastColor(c)
        let thisTurn = turn
        setTurn(t => t + 1)

        if( checkVictory(matrix.current) ) {
            setState(VICTORY)
            history.push(`Won in ${thisTurn + 1} moves. Score: ${newScore}`)
        }
    }

    const newGame = () => {
        matrix.current = randomMap()
        pickColor(matrix.current.get(startX, startY)[0])
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
        setLastColor(-1); //matrix.current.get(startX, startY)[0])
        setState(PLAYING)
        setTurn(0)
    }

    const gridStyle = { gridTemplateColumns: `repeat(${SIZEX}, ${SIZEEM})`, gridTemplateRows: `repeat(${SIZEY}, ${SIZEEM})` }

    return (
        <div className="App">
        <header className="App-header">
            Color swap
            <button className="settings-icon" onClick={() => setShowSettings(s => !s)}> ⚙️ </button>
        </header>
        TODO: 1) settings: seed, sizex+y, <br/>2) level selection,<br/> 3) remember level scores, <br/>4) load level by code
        {showSettings ? (
            <main>
            <Settings />
            </main>
        ) : (
            <main>
            <section className="grid"  style={gridStyle}>
                {matrix.current.data.map(([c, owned], i) => (
                    <div key={i} className={`c${c} ` + (owned?'owned':'')} onClick={null}> </div>
                ))}
            </section>

            <section className="color-section">
            {palette.map((p, i) => (
                <button className="color-button" key={p} style={{ backgroundColor: p }} disabled={lastColor==i || state==VICTORY} onClick={() => pickColor(i)}> </button>
            ))}
            </section>

            <section>
            {turn} moves. Score: {score}
            {state===VICTORY && (
                <><br /> You won! <br/>
                <button className="ui-button" onClick={newGame}> Start new game </button>
                {/*<button onClick={restart}> Restart </button>*/}
                </>
            )}
            </section>


            <section className="separator-top">
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

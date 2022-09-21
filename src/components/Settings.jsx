import { useState } from 'react';
import { useStore } from '../store'
import './Settings.scss'

const MIN_X = 4, MIN_Y = 4
const MAX_X = 100, MAX_Y = 100

const SettingsPage = ({ newGame }) => {
	const [sx, setSx] = useState(useStore(state => state.sizex))
	const [sy, setSy] = useState(useStore(state => state.sizey))

	const setSizeX = useStore(state => state.setSizeX)
	const setSizeY = useStore(state => state.setSizeY)
	const setSize = useStore(state => state.setSize)

	const enableSaveGrid = sx >= MIN_X && sx <= MAX_X && sy >= MIN_Y && sy <= MAX_Y

	const save = () => {
		if( enableSaveGrid )
			setSize(sx, sy)
		// colors
		// starting position

		if( enableSaveGrid )
			newGame(sx, sy)
		else
			newGame()
	}

	const handleSx = e => setSx(e.target.value)
	const handleSy = e => setSy(e.target.value)

	return (
		<div className="settings">
		<section>
			<h3> Grid size </h3>
			<p className="flex-vertical">
			<span> Size can be ({MIN_X}-{MAX_X}) times ({MIN_Y}-{MAX_Y}). </span>
			<input type="number" title="Width" value={sx} onChange={handleSx} />
			<input type="number" title="Height" value={sy} onChange={handleSy} />
			{/*<button disabled={!enableSaveGrid} onClick={save}> Start new game </button>*/}
			</p>
		</section>

		<section>
			<h3> Colors </h3>
			<p className="flex-vertical">
				something something
			</p>
		</section>

		<section>
			<h3> Starting position </h3>
		</section>

		<button onClick={save}> Save settings </button>
		<p> Will apply when you start a new game. </p>
		</div>
	)
}

export default SettingsPage

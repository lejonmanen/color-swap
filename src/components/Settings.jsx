import { useState } from 'react';

const SettingsPage = () => {
	const [x, setX] = useState(0)

	return (
		<div> settings here: grid size, # colors, starting position </div>
	)
}

export default SettingsPage

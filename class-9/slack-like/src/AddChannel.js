import { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { client } from './index'

const ADD_CHANNEL = gql`
	mutation AddChannel($name: String!){
		addChannel(name: $name) {
			name
	}
}` // 

function Channels() {
	const [channel, setChannel] = useState('')
	const [ addChannel, { data } ] = useMutation(ADD_CHANNEL)
	
	return (
		<div className="AddChannel">
			<form 
				onSubmit={(e) => {
					e.preventDefault()
					addChannel({ variables: { name: channel } })
				}}
			>
				<input 
					value={channel}
					onChange={e => setChannel(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default Channels





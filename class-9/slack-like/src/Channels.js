import { useEffect, useState } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'
import { client } from './index'

function Channels() {
	const [channels, setChannels] = useState(null)

	// --------------------------------------------
	const CHANNEL_SUBSCRIPTION = gql`
	subscription NewChannel {
		newChannel{
			name
		}
	}
`

	// const { data: { commentAdded }, loading } = useSubscription(
	// 	CHANNEL_SUBSCRIPTION
	// );

	// --------------------------------------------
	async function getChannels() {
    try {
      const query = { 
      query: gql`
        query {
          channels {
            name
        }
      }
    `}
      const json = await client.query(query)
      setChannels(json.data.channels)
    } catch(err) {
      console.log(err.message)
    }
  }
	// ---------------------------------------

	useEffect(() => {
		getChannels()
	})

	return (
		<div className="Channels">
			{channels ? channels.map(channel => <div>{channel.name}</div>) : null}
		</div>
	)
}

export default Channels

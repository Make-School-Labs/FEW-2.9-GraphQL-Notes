import { useSubscription, gql } from '@apollo/client'

const NEW_CHANNEL_SUBSCRIPTION = gql`
  subscription NewChannel {
    newChannel {
      name
    }
  }
`;

function TestNewChannel() {
  const sub = useSubscription(
    NEW_CHANNEL_SUBSCRIPTION
  );

  console.log(sub)
  const { data, loading } = sub

  return <h4>New Channel: { !loading && data.newChannel.name }</h4>;
}

export default TestNewChannel

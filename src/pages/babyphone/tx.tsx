import { OutgoingLink } from '@47ng/chakra-next'
import { Box, Button, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import type Peer from 'peerjs'
import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { useURL } from 'src/hooks/useURL'
import { PageLayout } from 'src/layouts/PageLayout'

export interface PeerError {
  type: string
}

export interface BabyPhoneTXPageProps {}

const BabyPhoneTXPage: NextPage<BabyPhoneTXPageProps> = ({}) => {
  const { localPeerID, connections, peer } = usePeerState({})
  console.dir(connections)
  const rxURL = useURL(`/babyphone/rx?id=${localPeerID}`)

  return (
    <PageLayout maxW="6xl">
      <Box my={12}>
        <Text fontFamily="mono" fontSize="sm">
          {localPeerID}
        </Text>
        <OutgoingLink href={rxURL}>Connect</OutgoingLink>
        {connections.map(connection => (
          <Text>
            {connection.label} {connection.peer}{' '}
            {JSON.stringify(connection.metadata)}
          </Text>
        ))}
        <Button
          leftIcon={<FiPhoneCall />}
          onClick={async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false
            })
            peer?.call(connections[0].peer, stream)
          }}
        >
          Call
        </Button>
      </Box>
    </PageLayout>
  )
}

export default BabyPhoneTXPage

// --

function usePeerState<TState extends {}>(
  initialState: TState,
  opts: { brokerId: string } = { brokerId: '' }
) {
  const [connections, setConnections] = React.useState<Peer.DataConnection[]>(
    []
  )
  const [state, setState] = React.useState<TState>(initialState)
  const [error, setError] = React.useState<PeerError | undefined>(undefined)
  // We useRef to get around useLayoutEffect's closure only having access
  // to the initial state since we only re-execute it if brokerId changes.
  const stateRef = React.useRef<TState>(initialState)
  const [peer, setPeer] = React.useState<Peer | undefined>(undefined)
  const [brokerId, setBrokerId] = React.useState(opts.brokerId)

  React.useEffect(() => {
    import('peerjs').then(({ default: Peer }) => {
      const localPeer = new Peer(opts.brokerId)
      setPeer(localPeer)

      localPeer.on('open', () => {
        if (brokerId !== localPeer.id) {
          setBrokerId(localPeer.id)
        }
      })

      localPeer.on('error', err => setError(err))

      localPeer.on('connection', conn => {
        setConnections(prevState => [...prevState, conn])

        // We want to immediately send the newly connected peer the current data.
        conn.on('open', () => {
          conn.send(stateRef.current)
        })
      })
    })

    return () => {
      peer && peer.destroy()
    }
  }, [opts.brokerId])

  return {
    state,
    setState: (newState: TState) => {
      setState(newState)
      stateRef.current = newState
      connections.forEach(conn => conn.send(newState))
    },
    localPeerID: brokerId,
    connections,
    error,
    peer
  }
}

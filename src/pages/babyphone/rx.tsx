import { Box, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import type Peer from 'peerjs'
import React from 'react'
import { PageLayout } from 'src/layouts/PageLayout'
import { PeerError } from './tx'

export interface BabyPhoneRXPageProps {}

const BabyPhoneRXPage: NextPage<BabyPhoneRXPageProps> = ({}) => {
  const { localPeerID, audioRef } = useReceivePeerState('foobareggspam')
  return (
    <PageLayout maxW="6xl">
      <Box my={12}>
        <Text fontFamily="mono" fontSize="sm">
          {localPeerID}
        </Text>
        <audio ref={audioRef as any} />
      </Box>
    </PageLayout>
  )
}

export default BabyPhoneRXPage

// --

function useReceivePeerState<TData extends {}>(
  peerBrokerId: string,
  opts: { brokerId: string } = { brokerId: '' }
) {
  const [state, setState] = React.useState<TData | undefined>(undefined)
  const [isConnected, setIsConnected] = React.useState(false)
  const [peer, setPeer] = React.useState<Peer | undefined>(undefined)
  const [brokerId, setBrokerId] = React.useState(opts.brokerId)
  const [error, setError] = React.useState<PeerError | undefined>(undefined)
  const audioRef = React.useRef<HTMLAudioElement>()

  React.useEffect(() => {
    if (!peerBrokerId) {
      return
    }

    import('peerjs').then(({ default: Peer }) => {
      const localPeer = new Peer(opts.brokerId)
      setPeer(localPeer)

      localPeer.on('open', () => {
        if (brokerId !== localPeer.id) {
          setBrokerId(localPeer.id)
        }

        localPeer.on('call', call => {
          call.answer()
          call.on('stream', stream => {
            if (audioRef.current) {
              audioRef.current.srcObject = stream
              audioRef.current.play()
            }
          })
        })

        const connection = localPeer.connect(peerBrokerId)

        connection.on('open', () => {
          connection.on('data', (receivedData: TData) => {
            // We want isConnected and data to be set at the same time.
            setState(receivedData)
            setIsConnected(true)
          })
        })

        connection.on('close', () => {
          setIsConnected(false)
        })

        connection.on('error', err => setError(err))
      })

      localPeer.on('error', err => setError(err))
    })

    return () => {
      setIsConnected(false)
      peer && peer.destroy()
    }
  }, [peerBrokerId, opts.brokerId])

  return { state, isConnected, error, localPeerID: brokerId, audioRef }
}

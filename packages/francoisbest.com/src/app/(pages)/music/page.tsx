import { Metadata } from 'next'
import { FiVolume2 } from 'react-icons/fi'
import { HireMe } from 'ui/components/hire-me'
import { Note } from 'ui/components/note'
import { SpotifyAlbum, SpotifyAlbumGrid } from 'ui/embeds/spotify-album'

export const metadata: Metadata = {
  title: 'Music',
  description: 'A few albums I like listening to, for work and relaxing.'
}

export default function MusicPage() {
  return (
    <>
      <h1>Music</h1>

      <Note status="success" icon={FiVolume2}>
        Check out my{' '}
        <a href="https://open.spotify.com/playlist/09JVRjAbg8ETlHWznfVOQf?si=F9Vksg9aQp2D7q5MbecMqw">
          Spotify playlist
        </a>{' '}
        for web development.
      </Note>

      <h3>Progressive Rock / Metal</h3>

      <SpotifyAlbumGrid>
        <SpotifyAlbum
          aria-label="The Mountain - Haken"
          url="https://open.spotify.com/album/3RBULTZJ97bvVzZLpxcB0j"
        />
        <SpotifyAlbum
          aria-label="Vector - Haken"
          url="https://open.spotify.com/album/1PhYHO7Pva9e1YQY5GQ8zx"
        />
        <SpotifyAlbum
          aria-label="Fauna - Haken"
          url="https://open.spotify.com/album/1KOHbC0QWnvLUKT5GS4JtE"
          title="Fauna"
        />
        <SpotifyAlbum
          aria-label="Epicloud - Devin Townsend Project"
          url="https://open.spotify.com/album/4WA0COIl14e6amUlwz89pN"
        />
        <SpotifyAlbum
          aria-label="Casualties of Cool - Devin Townsend"
          url="https://open.spotify.com/album/37cVlKDwp4lcIqb3Bwv4et"
        />
        <SpotifyAlbum
          aria-label="Empath - Devin Townsend"
          url="https://open.spotify.com/album/7MPJRyMFbWbgezRP2Pj4TZ"
        />
        <SpotifyAlbum
          aria-label="Ziltoid Live - Devin Townsend Project"
          url="https://open.spotify.com/album/6gwHddBxh92zNI459I2PPD"
          title="Ziltoid Live"
        />
        <SpotifyAlbum
          aria-label="Much Against Everyone's Advice - Soulwax"
          url="https://open.spotify.com/album/1Zisq1gECqPQtxvny6AUXP"
        />
        <SpotifyAlbum
          aria-label="Any Minute Now - Soulwax"
          url="https://open.spotify.com/album/6oAU1ajSCbepPdsQVUfsbj"
        />
        <SpotifyAlbum
          aria-label="The Further Side - Nova Collective"
          url="https://open.spotify.com/album/2opFAZPTe5dgHgNnDO2Ak4"
        />
        <SpotifyAlbum
          aria-label="Superunknown - Soundgarden"
          url="https://open.spotify.com/album/4K8bxkPDa5HENw0TK7WxJh"
          title="Superunknown"
        />
        <SpotifyAlbum
          aria-label="Audioslave"
          url="https://open.spotify.com/album/78guAsers0klWl6RwzgDLd"
        />
        <SpotifyAlbum
          aria-label="Insurgentes - Steven Wilson"
          url="https://open.spotify.com/album/3psPvfJX0dMn05RK7fqcIL"
          title="Insurgentes"
        />
        <SpotifyAlbum
          url="https://open.spotify.com/album/2xJFvV7JzoYYMere5rqjVf"
          title="The Raven That Refused to Sing"
        />
        <SpotifyAlbum
          aria-label="Hand Cannot Erase"
          url="https://open.spotify.com/album/6P7vL4vGgyrD7q9VR9BcnV"
        />
      </SpotifyAlbumGrid>

      <br />

      <h3>Electro / Synthwave</h3>

      <SpotifyAlbumGrid>
        <SpotifyAlbum
          aria-label="Igneous - Polynation"
          url="https://open.spotify.com/album/5kU3Q43bmLdARkMOCOLNkB"
        />
        <SpotifyAlbum
          aria-label="Trilogy - Carpenter Brut"
          url="https://open.spotify.com/album/0io5pe55YRCTVqEjwlOBdN"
        />
        <SpotifyAlbum
          aria-label="Dangerous Days"
          url="https://open.spotify.com/album/0GzBfwarPFhAdfLNHfgaRT"
        />
        <SpotifyAlbum
          aria-label="Kid Velo - Rival Consoles"
          url="https://open.spotify.com/album/6nj966rHe5ui3JKwqh8a32"
        />
        <SpotifyAlbum
          aria-label="Nite Versions - Soulwax"
          url="https://open.spotify.com/album/5ftdUoPzoh1y5bIroXw68G"
        />
      </SpotifyAlbumGrid>

      <br />

      <h3>Extreme Prog</h3>

      <p>It gets wild. You've been warned.</p>

      <SpotifyAlbumGrid>
        <SpotifyAlbum
          aria-label="Rococo Holocaust - Pryapisme"
          url="https://open.spotify.com/album/2iuftfHy8BAyG4ePAB7xcY"
        />
        <SpotifyAlbum
          aria-label="Hyperblast Super Collider - Pryapisme"
          url="https://open.spotify.com/album/7Glnx0Uhu8f7QdKRKx6nlN"
        />
        <SpotifyAlbum
          aria-label="Brute Force - The Algorithm"
          url="https://open.spotify.com/album/3HNzOyPbz5vPvUie7lI97X"
        />
        <SpotifyAlbum
          aria-label="Polymorphic Code - The Algorithm"
          url="https://open.spotify.com/album/2wPyt8oSnSAXsuYeQMzTzq"
        />
        <SpotifyAlbum
          aria-label="Tea Time for Punks - Morglbl"
          url="https://open.spotify.com/album/6ceOYvxgsFYpTPgdgYgnie"
        />
      </SpotifyAlbumGrid>

      <br />

      <h3>Calm / Meditation</h3>

      <p>
        If the previous section was too wild for your taste, check out those
        albums & artists:
      </p>

      <SpotifyAlbumGrid>
        <SpotifyAlbum
          aria-label="Passage - Ulrich Schnauss"
          url="https://open.spotify.com/album/4Aumawi2PZuCxo10dQc3vn"
        />
        <SpotifyAlbum
          aria-label="Contact Note - Jon Hopkins"
          url="https://open.spotify.com/album/582EKMkWdR5wmroAm9NqfE"
        />
        <SpotifyAlbum
          aria-label="Immunity - Jon Hopkins"
          url="https://open.spotify.com/album/1rxWlYQcH945S3jpIMYR35"
        />
      </SpotifyAlbumGrid>

      <HireMe outerClass="mt-12" />

      <nav role="list" className="!mt-12 flex flex-col items-center text-center text-sm">
        <a role="listitem" href="https://github.com/franky47/francoisbest.com/blob/next/packages/francoisbest.com/src/app/(pages)/music/page.tsx" className="!text-gray-500">
          Edit this page on GitHub
        </a>
      </nav>
    </>
  )
}

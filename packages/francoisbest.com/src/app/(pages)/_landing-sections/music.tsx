import { SpotifyAlbum, SpotifyAlbumGrid } from 'ui/embeds/spotify-album'
import { SpotifyArtist, SpotifyArtistGrid } from 'ui/embeds/spotify-artist'

export const FavouriteArtists = () => (
  <SpotifyArtistGrid>
    <SpotifyArtist
      url="https://open.spotify.com/artist/2SRIVGDkdqQnrQdaXxDkJt"
      aria-label="Haken"
    />
    <SpotifyArtist
      url="https://open.spotify.com/artist/6uejjWIOshliv2Ho0OJAQN"
      aria-label="Devin Townsend"
    />
    <SpotifyArtist
      url="https://open.spotify.com/artist/1l2oLiukA9i5jEtIyNWIEP"
      aria-label="Carpenter Brut"
    />
    <SpotifyArtist
      url="https://open.spotify.com/artist/43mWhBXSflupNLuNjM5vff"
      aria-label="Soulwax"
    />
  </SpotifyArtistGrid>
)

export const FavouriteAlbums = () => (
  <SpotifyAlbumGrid>
    <SpotifyAlbum
      aria-label="The Further Side - Nova Collective"
      url="https://open.spotify.com/album/2opFAZPTe5dgHgNnDO2Ak4"
    />
    <SpotifyAlbum
      aria-label="Igneous - Polynation"
      url="https://open.spotify.com/album/5kU3Q43bmLdARkMOCOLNkB"
    />
    <SpotifyAlbum
      aria-label="Fauna - Haken"
      url="https://open.spotify.com/album/1KOHbC0QWnvLUKT5GS4JtE"
      title="Fauna"
    />
    <SpotifyAlbum
      aria-label="Kid Velo - Rival Consoles"
      url="https://open.spotify.com/album/6nj966rHe5ui3JKwqh8a32"
    />
    <SpotifyAlbum
      aria-label="Epicloud - Devin Townsend Project"
      url="https://open.spotify.com/album/4WA0COIl14e6amUlwz89pN"
    />
    <SpotifyAlbum
      aria-label="Them Crooked Vultures"
      url="https://open.spotify.com/album/0Z6IBizcq7DLXpenjSHqF3"
    />
    <SpotifyAlbum
      aria-label="TRILOGY - Carpenter Brut"
      url="https://open.spotify.com/album/0io5pe55YRCTVqEjwlOBdN"
    />
    <SpotifyAlbum
      aria-label="Much Against Everyone's Advice - Soulwax"
      url="https://open.spotify.com/album/1Zisq1gECqPQtxvny6AUXP"
    />
    <SpotifyAlbum
      aria-label="Superunknown - Soundgarden"
      url="https://open.spotify.com/album/4K8bxkPDa5HENw0TK7WxJh"
      title="Superunknown"
    />
  </SpotifyAlbumGrid>
)

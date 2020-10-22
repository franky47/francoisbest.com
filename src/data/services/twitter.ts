import {
  TweetData,
  TweetPhotoData,
  TweetVideoData
} from 'src/components/embeds/Tweet'
import TwitterClient from 'twitter-api-client'
import twitterText from 'twitter-text'
import twemoji from 'twemoji'

function formatTweetData(t: any): TweetData {
  // Inject line breaks before parsing
  const text = t.full_text.replace(/\n/g, '<br/>')
  let body = twitterText.autoLink(text, {
    urlEntities: t.entities.urls,
    targetBlank: true,
    usernameIncludeSymbol: true,
    linkAttributeBlock: (_entity, attr) => {
      if (
        attr.href?.startsWith('https://t.co/') &&
        !attr.title?.startsWith('https://t.co')
      ) {
        // Bypass t.co resolution (title contains full resolved URL)
        attr.href = attr.title
      }
      attr.rel = 'nofollow noopener noreferrer'
      attr.class = ((attr.class ?? '') + ' highlighted-link').trim()
    }
  })

  // Inject SVG emoji
  body = twemoji.parse(body, {
    folder: 'svg',
    ext: '.svg'
  })

  // Remove trailing link to media
  if (t.extended_entities?.media?.length > 0) {
    const regex = new RegExp(
      ` <a target="_blank" rel="nofollow noopener noreferrer" class="highlighted-link">${t.extended_entities.media[0].url}<\/a>$`
    )
    body = body.replace(regex, '')
  }
  const stats = twitterText.parseTweet(t.full_text)
  return {
    author: {
      avatarURL: (
        t.user.profile_image_url_https ?? t.user.profile_image_url
      ).replace('_normal.jpg', '_reasonably_small.jpg'),
      displayName: t.user.name,
      handle: t.user.screen_name
    },
    largeText: stats.weightedLength < 150,
    body,
    media: (t.extended_entities?.media ?? []).map((media: any) =>
      media.type === 'video'
        ? ({
            type: media.type,
            src: media.media_url_https ?? media.media_url,
            url: media.expanded_url ?? media.url,
            alt: media.ext_alt_text ?? undefined,
            sources: media.video_info.variants.map((variant: any) => ({
              url: variant.url,
              type: variant.content_type
            }))
          } as TweetVideoData)
        : ({
            type: media.type,
            src: media.media_url_https ?? media.media_url,
            url: media.expanded_url ?? media.url,
            alt: media.ext_alt_text ?? undefined
          } as TweetPhotoData)
    ),
    meta: {
      url: `https://twitter.com/${t.user.screen_name}/status/${t.id_str}`,
      date: new Date(t.created_at).valueOf(),
      likes: t.favorite_count ?? 0,
      retweets: t.retweet_count ?? 0
    },
    quotedTweet: Boolean(t.quoted_status)
      ? formatTweetData(t.quoted_status)
      : undefined
  }
}

// --

export async function fetch(urls: string[]): Promise<[string, TweetData][]> {
  if (urls.length > 100) {
    // No need to try, fail early
    throw new Error('Max number of tweets reached: implement chunk fetching.')
  }

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY!,
    apiSecret: process.env.TWITTER_API_SECRET_KEY!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })

  const tweetIDs = urls.map(url => url.slice(url.lastIndexOf('/') + 1))
  const tweets = await twitterClient.tweets.statusesLookup({
    id: tweetIDs.join(','),
    include_entities: true,
    trim_user: false,
    tweet_mode: 'extended',
    include_card_uri: true,
    include_ext_alt_text: true
  })

  return tweets.map(tweet => [tweet.id_str, formatTweetData(tweet)])
}

import { NextResponse } from 'next/server'

export async function GET() {
  if (process.env.VERCEL_ENV !== 'production') {
    return new NextResponse(null, {
      status: 404,
      statusText: 'Not found',
    })
  }
  // https://notebook.lachlanjc.com/2022-11-18_link_your_domain_to_mastodon_with_nextjs
  return NextResponse.json({
    subject: 'acct:Franky47@mamot.fr',
    aliases: ['https://mamot.fr/@Franky47', 'https://mamot.fr/users/Franky47'],
    links: [
      {
        rel: 'http://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: 'https://mamot.fr/@Franky47',
      },
      {
        rel: 'self',
        type: 'application/activity+json',
        href: 'https://mamot.fr/users/Franky47',
      },
      {
        rel: 'http://ostatus.org/schema/1.0/subscribe',
        template: 'https://mamot.fr/authorize_interaction?uri={uri}',
      },
    ],
  })
}

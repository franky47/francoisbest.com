import Link from 'next/link'

type Model = 'floors' | 'adjusted' | 'flat'
type Tier = 'Gold' | 'Silver' | 'Bronze' | 'Other'
type Sponsor = {
  login: string
  name: string
  amount: number
  avatarUrl: string
}

const sponsors: Sponsor[] = [
  {
    login: 'upstash',
    name: 'Upstash',
    amount: 100,
    avatarUrl: 'https://avatars.githubusercontent.com/u/74989412?v=4'
  },
  {
    login: 'coderabbitai',
    name: 'CodeRabbit',
    amount: 100,
    avatarUrl: 'https://avatars.githubusercontent.com/u/132028505?v=4'
  },
  {
    login: '1771-Technologies',
    name: '1771 Technologies',
    amount: 100,
    avatarUrl: 'https://avatars.githubusercontent.com/u/148620833?v=4'
  },
  {
    login: 'loops-so',
    name: 'Loops',
    amount: 50,
    avatarUrl: 'https://avatars.githubusercontent.com/u/93287080?v=4'
  },
  {
    login: 'ryanmagoon',
    name: 'Ryan Magoon',
    amount: 20,
    avatarUrl: 'https://avatars.githubusercontent.com/u/5327290?v=4'
  },
  {
    login: 'AlemTuzlak',
    name: 'Alem Tuzlak',
    amount: 20,
    avatarUrl: 'https://avatars.githubusercontent.com/u/18480956?v=4'
  },
  {
    login: 'code-store-platform',
    name: 'code.store',
    amount: 20,
    avatarUrl: 'https://avatars.githubusercontent.com/u/57156815?v=4'
  },
  {
    login: 'openstatusHQ',
    name: 'OpenStatus',
    amount: 20,
    avatarUrl: 'https://avatars.githubusercontent.com/u/136892265?v=4'
  },
  {
    login: 'liminityab',
    name: 'Liminity AB',
    amount: 20,
    avatarUrl: 'https://avatars.githubusercontent.com/u/179804668?v=4'
  },
  {
    login: 'databuddy-analytics',
    name: 'Databuddy',
    amount: 20,
    avatarUrl: 'https://avatars.githubusercontent.com/u/190393139?v=4'
  },
  {
    login: 'TeknikGeek',
    name: 'TeknikGeek',
    amount: 20,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/305639089?u=2544e15371f168364be941a4ee0a1706d0dca197&v=4'
  },
  {
    login: 'pontusab',
    name: 'Pontus Abrahamsson',
    amount: 10,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/655158?u=4ed2dd3339c694c58bb65211a26e048a222ca710&v=4'
  },
  {
    login: 'lindesvard',
    name: 'Carl-Gerhard Lindesvärd',
    amount: 10,
    avatarUrl: 'https://avatars.githubusercontent.com/u/1987198?v=4'
  },
  {
    login: 'rwieruch',
    name: 'Robin Wieruch',
    amount: 10,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/2479967?u=cba76c8678af8e63ee2dd32853a4e262b35f9ac0&v=4'
  },
  {
    login: 'lpbonomi',
    name: 'Luispe',
    amount: 10,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/38361000?u=f33251ed14299bfadd8f33f3d5e9298032c9a7c8&v=4'
  },
  {
    login: 'juandadev',
    name: 'Juan Daniel Martínez',
    amount: 5,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/38818606?u=a1374b4e9467f0e9e25e418e54dc0dcd9e86da19&v=4'
  },
  {
    login: 'konhi',
    name: 'Jan Szymański',
    amount: 5,
    avatarUrl: 'https://avatars.githubusercontent.com/u/61631665?v=4'
  },
  {
    login: 'aurorascharff',
    name: 'Aurora Scharff',
    amount: 5,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/66901228?u=83c70cda14ee9b5266cd240872f574e0be0c8808&v=4'
  }
]

const models: Model[] = ['floors', 'adjusted', 'flat']

const modelCopy = {
  floors: {
    name: 'Fixed floors',
    shortName: 'Fixed floors',
    rule: 'Gold ≥ $200; Silver $100–199; Bronze $50–99; Other $1–49.',
    verdict:
      'Stable and easy to explain, but the current Gold section is empty and most sponsors collapse into Other.'
  },
  adjusted: {
    name: 'Distribution-adjusted floors',
    shortName: 'Adjusted floors',
    rule: 'Gold ≥ $100; Silver $50–99; Bronze $20–49; Other $1–19.',
    verdict:
      'Keeps stable, understandable boundaries while producing useful density for the current distribution.'
  },
  flat: {
    name: 'Flat control',
    shortName: 'Flat',
    rule: 'Every active recurring sponsorship above $0 belongs to one Sponsors section.',
    verdict:
      'Most honest and compact, but it removes the prominence hierarchy the four named tiers are meant to provide.'
  }
} satisfies Record<
  Model,
  { name: string; shortName: string; rule: string; verdict: string }
>

const tiers: Tier[] = ['Gold', 'Silver', 'Bronze', 'Other']

function classify(model: Model, sponsor: Sponsor): Tier {
  if (model === 'floors') {
    if (sponsor.amount >= 200) return 'Gold'
    if (sponsor.amount >= 100) return 'Silver'
    if (sponsor.amount >= 50) return 'Bronze'
    return 'Other'
  }
  if (model === 'adjusted') {
    if (sponsor.amount >= 100) return 'Gold'
    if (sponsor.amount >= 50) return 'Silver'
    if (sponsor.amount >= 20) return 'Bronze'
  }
  return 'Other'
}

function SponsorGrid({ members }: { members: Sponsor[] }) {
  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        No sponsors at this tier in the current snapshot.
      </div>
    )
  }
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4">
      {members.map(sponsor => (
        <li key={sponsor.login} className="min-w-0 text-center">
          <a
            href={`https://github.com/${sponsor.login}`}
            className="group flex flex-col items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            {/* A plain image keeps this throwaway prototype close to the intended grid. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sponsor.avatarUrl}
              alt=""
              className="size-20 rounded-full bg-gray-100 object-cover ring-1 ring-gray-200 transition-transform group-hover:scale-105 dark:bg-gray-800 dark:ring-gray-700"
            />
            <span className="max-w-full truncate text-sm font-medium group-hover:underline">
              {sponsor.name}
            </span>
            <span className="-mt-1 text-xs tabular-nums text-gray-400">
              ${sponsor.amount}/mo
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function TierSection({ tier, members }: { tier: Tier; members: Sponsor[] }) {
  return (
    <section className="space-y-5" aria-labelledby={`tier-${tier}`}>
      <div className="flex items-baseline justify-between gap-4 border-b border-gray-200 pb-2 dark:border-gray-800">
        <h2
          id={`tier-${tier}`}
          className="text-xl font-semibold tracking-tight"
        >
          {tier}
        </h2>
        <span className="text-sm tabular-nums text-gray-500 dark:text-gray-400">
          {members.length} {members.length === 1 ? 'sponsor' : 'sponsors'}
        </span>
      </div>
      <SponsorGrid members={members} />
    </section>
  )
}

function isModel(value: string | undefined): value is Model {
  return value !== undefined && models.some(model => model === value)
}

export default async function SponsorsTierPrototype({
  searchParams
}: {
  searchParams: Promise<{ model?: string }>
}) {
  const requestedModel = (await searchParams).model
  const model: Model = isModel(requestedModel) ? requestedModel : 'floors'
  const copy = modelCopy[model]
  const grouped = {
    Gold: sponsors.filter(sponsor => classify(model, sponsor) === 'Gold'),
    Silver: sponsors.filter(sponsor => classify(model, sponsor) === 'Silver'),
    Bronze: sponsors.filter(sponsor => classify(model, sponsor) === 'Bronze'),
    Other: sponsors.filter(sponsor => classify(model, sponsor) === 'Other')
  } satisfies Record<Tier, Sponsor[]>

  return (
    <>
      <div className="mx-auto w-screen max-w-3xl px-2 pb-36">
        <aside className="mb-10 rounded-lg border border-violet-300 bg-violet-50 p-4 text-sm text-violet-950 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100">
          <p className="font-semibold">Throwaway prototype · Wayfinder</p>
          <p className="mt-1 opacity-80">
            Live public active GitHub Sponsors snapshot: 18 sponsors with
            visible monthly tiers. Two public sponsors whose tier amount is
            unavailable are omitted. Dollar badges and counts are review
            annotations, not proposed production UI.
          </p>
        </aside>

        <header className="mb-14 space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {copy.name}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sponsors
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Thank you to everyone supporting my open-source work.
          </p>
          <div className="rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-900">
            <p>
              <strong>Rule:</strong> {copy.rule}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {copy.verdict}
            </p>
          </div>
        </header>

        <div className="space-y-14">
          {model === 'flat' ? (
            <section className="space-y-5" aria-labelledby="all-sponsors">
              <div className="flex items-baseline justify-between gap-4 border-b border-gray-200 pb-2 dark:border-gray-800">
                <h2
                  id="all-sponsors"
                  className="text-xl font-semibold tracking-tight"
                >
                  Sponsors
                </h2>
                <span className="text-sm tabular-nums text-gray-500 dark:text-gray-400">
                  {sponsors.length} sponsors
                </span>
              </div>
              <SponsorGrid members={sponsors} />
            </section>
          ) : (
            tiers.map(tier => (
              <TierSection key={tier} tier={tier} members={grouped[tier]} />
            ))
          )}
        </div>

        <aside className="mt-16 border-t border-gray-200 pt-8 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <p>
            Boundary probe: fixed floors classify $200 as Gold, $199 and $100 as
            Silver, $99 and $50 as Bronze, and $49 as Other. Adjusted floors
            classify $100 as Gold, $99 and $50 as Silver, $49 and $20 as Bronze,
            and $19 as Other. Flat has no tier boundaries.
          </p>
        </aside>
      </div>

      <nav
        aria-label="Prototype variants"
        className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[calc(100%-1rem)] items-center gap-1 rounded-full border border-gray-200 bg-white/95 p-1.5 shadow-xl backdrop-blur dark:border-gray-700 dark:bg-gray-900/95"
      >
        {models.map(item => (
          <Link
            key={item}
            href={`?model=${item}`}
            aria-current={item === model ? 'page' : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium no-underline transition-colors ${
              item === model
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {modelCopy[item].shortName}
          </Link>
        ))}
      </nav>
    </>
  )
}

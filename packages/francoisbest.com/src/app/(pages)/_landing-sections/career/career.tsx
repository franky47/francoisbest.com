import { Logo } from 'ui/components/logo'
import { Note } from 'ui/components/note'
import { Client, Experience } from './experience'
import ArturiaLogo from './icons/arturia.svg'
import GaelLogo from './icons/gael.svg'
import HeronLogo from './icons/heron.svg'
import AcquereurLogo from './icons/lacquereur.svg'
import MarianneLogo from './icons/marianne.svg'
import PulsarLogo from './icons/pulsar.svg'
import SlateLogo from './icons/slate-digital.svg'

export type CareerProps = React.ComponentProps<'div'> & {}

export const Career: React.FC = () => {
  return (
    <>
      <Experience
        title="47ng"
        url="https://47ng.com"
        years="2018 - present"
        Icon={Logo}
        description={
          <>
            <p className="mb-4">
              I'm doing freelance software development for startups, businesses
              and public institutions:
            </p>
            <ul>
              <Client
                title="La Fabrique Numérique des Ministères Sociaux"
                url="https://github.com/SocialGouv/e2esdk"
                Icon={MarianneLogo}
                description={
                  <>
                    Designing an open-source{' '}
                    <a
                      href="https://github.com/SocialGouv/e2esdk"
                      className="underline"
                    >
                      end-to-end encryption SDK
                    </a>{' '}
                    for web applications.
                  </>
                }
                tags={[
                  'Chakra-UI',
                  'Docker',
                  'Fastify',
                  'Full-Stack',
                  'Libsodium',
                  'Node.js',
                  'PostgreSQL',
                  'Redis',
                  'Turborepo',
                  'TypeScript',
                ]}
              />
              <Client
                title="Heron"
                // url="https://heron.app" -> dead link
                Icon={HeronLogo}
                description="Bootstrapping the MVP of a compensation market analysis app for a young international startup."
                tags={[
                  'Chakra-UI',
                  'Full-Stack',
                  'GraphQL',
                  'Next.js',
                  'PlanetScale',
                  'Prisma',
                  'Recharts',
                  'TypeScript',
                ]}
              />
              <Client
                title="myNUMEA"
                url="https://www.mynumea.com/"
                description="Reporting dashboard &amp; analytics for a micro-nutrition IoT device."
                tags={[
                  'React',
                  'Express',
                  'Redux',
                  'Chakra-UI',
                  'VisX',
                  'Full-Stack',
                ]}
              />
              <Client
                title="L'Acquéreur"
                // url="https://lacquereur.com" -> dead link
                Icon={AcquereurLogo}
                description="A French startup helping real-estate buyers and sellers meet."
                tags={['Meteor.js', 'Styled-Components', 'Web Design']}
              />
              <Client
                title="Pulsar Audio"
                url="https://pulsar.audio"
                Icon={PulsarLogo}
                description={
                  <>
                    Embedded UI for{' '}
                    <a href="https://www.digigram.com/">
                      Digigram's Iqoya Talk
                    </a>
                    , a mobile broadcast recording studio.
                  </>
                }
                tags={['C++', 'Qt', 'QML', 'Embedded Linux', 'UI Design']}
              />
              <Client
                title="Grenoble Applied Economics Laboratory"
                url="https://grenoble.inra.fr"
                Icon={GaelLogo}
                description="I built a Next.js webapp for an economics experiment ran by my wife's team."
                tags={['Next.js', 'TypeScript', 'Jamstack', 'a11y']}
              />
            </ul>
            <Note status="success" title="Add your business here">
              <p className="my-4">
                You have a project you want to take further ?
              </p>
              <a href="mailto:freelance@francoisbest.com" className="underline">
                Send me an email
              </a>
              , I'd love to discuss your needs and see how I can help.
            </Note>
          </>
        }
      />
      <Experience
        title="Slate Digital"
        url="https://slatedigital.com"
        years="2011 - 2018"
        Icon={SlateLogo}
        description={
          <p className="mb-0">
            I wore many hats when working at Slate Digital, from C++ programming
            for real-time pro audio applications to DSP algorithm design and
            tooling in Python and Ruby.
          </p>
        }
        tags={[
          'C++',
          'Python',
          'Ruby',
          'Digital Signal Processing',
          'Algorithm Design',
          'Real-Time Audio',
        ]}
      />
      <Experience
        title="Arturia"
        years="2010"
        url="https://arturia.com"
        Icon={ArturiaLogo}
        description={
          <>
            <p>
              I helped design the{' '}
              <a href="https://en.wikipedia.org/wiki/Arturia_MiniBrute">
                MiniBrute
              </a>{' '}
              analog synthesizer when I was an intern at Arturia. It was my
              first professional experience and a lot of fun.
            </p>
            <p className="mb-0">
              I had the privilege of working with a great team led by{' '}
              <a href="https://yusynth.net/index_en.php">Yves Usson</a>, from
              whom I had learned analog synthesis before joining Arturia.
            </p>
          </>
        }
        tags={[
          'C++',
          'Analog Electronics',
          'Synthesizer Design',
          'Hardware Design',
        ]}
      />
    </>
  )
}

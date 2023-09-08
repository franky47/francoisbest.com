import { FiMail } from 'react-icons/fi'
import { Note, NoteProps } from 'ui/components/note'

type HireMeProps = Omit<NoteProps, 'status' | 'title'> & {
  available: string | true
}

export const HireMe: React.FC<HireMeProps> = ({ available, ...props }) => {
  return (
    <Note
      status="success"
      icon={(props: React.ComponentProps<'span'>) => <span {...props}>🤝</span>}
      title="Hire me!"
      titleClass="text-lg underline decoration-dotted"
      innerClass="space-y-2 pt-2"
      {...props}
    >
      <p>
        I build <strong>web apps</strong> for startups, businesses and public
        institutions as a <strong>freelance</strong> web developer and designer.
        Let&apos;s <strong>discuss your needs</strong> and see how I can help.
      </p>
      {typeof available === 'string' && (
        <p>
          <em>
            <strong className="text-current">Note:</strong> my earliest
            availability is{' '}
            <strong className="text-current">{available}</strong>.
          </em>
        </p>
      )}
      <a
        href="mailto:freelance@francoisbest.com"
        className="bg-green-600 !text-white px-4 text-lg py-2 rounded no-underline hover:no-underline hover:bg-green-500 active:bg-green-600/75 inline-block"
      >
        <FiMail className="inline-block mr-2 -mt-[2px]" />
        Contact me
      </a>
    </Note>
  )
}

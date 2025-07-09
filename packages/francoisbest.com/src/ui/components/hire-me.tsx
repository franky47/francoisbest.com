import { FiMail } from 'react-icons/fi'
import { Note, NoteProps } from 'ui/components/note'

const AVAILABLE = 'September 2025'

type HireMeProps = Omit<NoteProps, 'status' | 'title' | 'children'>

export const HireMe: React.FC<HireMeProps> = ({ ...props }) => {
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
      {typeof AVAILABLE === 'string' && (
        <p>
          <em>
            <strong className="text-current">Note:</strong> my earliest
            availability is{' '}
            <strong className="text-current">{AVAILABLE}</strong>.
          </em>
        </p>
      )}
      <a
        href="mailto:freelance@francoisbest.com"
        className="inline-block rounded bg-green-600 px-4 py-2 text-lg !text-white no-underline hover:bg-green-500 hover:no-underline active:bg-green-600/75"
      >
        <FiMail className="-mt-[2px] mr-2 inline-block" />
        Contact me
      </a>
    </Note>
  )
}

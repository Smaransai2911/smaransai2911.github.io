import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import { socialIcons } from '../components/Icons'
import { contact, social } from '../data/portfolioData'

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading id="contact" eyebrow="Contact" title="Let’s create something meaningful." support="For collaborations, creative projects, technical discussions or simply an interesting conversation." />
          {contact.email && <p className="mb-6 text-ink2">Or write to <a className="text-ink underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a></p>}
          <ul className="space-y-3">
            {Object.entries(social).map(([k, s]) => {
              const Icon = socialIcons[k]
              return (
                <li key={k}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-ink2 transition hover:text-ink">
                      <Icon /> {s.label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-3 text-ink3"><Icon /> {s.label} · link to be added</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-card p-6 sm:p-9">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

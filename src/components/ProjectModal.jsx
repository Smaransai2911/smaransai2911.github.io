
import Modal from './Modal'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './Icons'

export default function ProjectModal({ project, onClose }) {
  const p = project

  const categories = p
    ? Array.isArray(p.category)
      ? p.category
      : [p.category]
    : []

  return (
    <Modal
      open={!!p}
      onClose={onClose}
      label={p ? `Project details: ${p.title}` : 'Project details'}
      className="max-w-2xl"
    >
      {p && (
        <div className="p-6 sm:p-9">
          <p className="eyebrow text-cyan">
            {categories.join(' · ')}
          </p>

          <h2 className="mt-3 pr-10 font-serif text-3xl leading-tight sm:text-4xl">
            {p.title}
          </h2>

          {p.sample && (
            <p className="mt-4 rounded-lg border border-amber/40 bg-amber/5 p-3 text-sm text-amber">
              Sample placeholder. This shows the card structure only and is not completed work.
            </p>
          )}

          {p.image && (
            <img
              src={p.image}
              alt={`${p.title} screenshot or architecture diagram`}
              loading="lazy"
              className="mt-6 w-full rounded-xl border border-line"
            />
          )}

          <dl className="mt-6 space-y-5 text-sm leading-relaxed">
            <div>
              <dt className="eyebrow mb-1 text-ink3">Problem</dt>
              <dd className="text-ink2">{p.problem}</dd>
            </div>

            <div>
              <dt className="eyebrow mb-1 text-ink3">Solution</dt>
              <dd className="text-ink2">{p.solution}</dd>
            </div>

            <div>
              <dt className="eyebrow mb-2 text-ink3">Technologies</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {(p.stack || []).map((s) => (
                    <li key={s} className="tag">{s}</li>
                  ))}
                </ul>
              </dd>
            </div>

            <div>
              <dt className="eyebrow mb-1 text-ink3">Status</dt>
              <dd className="text-ink2">{p.status}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            {p.github ? (
              <a
                className="btn btn-ghost"
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon /> GitHub
              </a>
            ) : (
              <span
                className="btn btn-ghost cursor-not-allowed opacity-50"
                aria-disabled="true"
              >
                <GitHubIcon /> Repository not added yet
              </span>
            )}

            {p.demo && (
              <a
                className="btn btn-ghost"
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} /> Live demo
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

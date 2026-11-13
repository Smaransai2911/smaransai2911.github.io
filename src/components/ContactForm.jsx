import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { site } from '../data/portfolioData'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const initial = { name: '', email: '', subject: '', message: '', botcheck: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.subject.trim()) e.subject = 'Please add a subject.'
  if (v.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters.'
  return e
}

export default function ContactForm() {
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error | unconfigured
  const [detail, setDetail] = useState('')

  const configured = site.web3formsAccessKey && site.web3formsAccessKey !== 'YOUR_ACCESS_KEY_HERE'
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    if (!configured) { setStatus('unconfigured'); return }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          name: v.name.trim(),
          email: v.email.trim(),
          subject: v.subject.trim(),
          message: v.message.trim(),
          botcheck: v.botcheck,
          from_name: 'Portfolio contact form',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) { setStatus('success'); setV(initial) }
      else { setStatus('error'); setDetail(data.message || 'The service did not accept the message.') }
    } catch {
      setStatus('error'); setDetail('Network error. Please check your connection and try again.')
    }
  }

  const field = 'mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink3 focus:border-cyan'
  const Err = ({ id, msg }) => (msg ? <p id={id} className="mt-1.5 text-xs text-[#fda4af]">{msg}</p> : null)

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-describedby="cf-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium">Name</label>
          <input id="cf-name" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} className={`${field} ${errors.name ? 'border-[#fda4af]' : 'border-line'}`} />
          <Err id="cf-name-err" msg={errors.name} />
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-medium">Email</label>
          <input id="cf-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} className={`${field} ${errors.email ? 'border-[#fda4af]' : 'border-line'}`} />
          <Err id="cf-email-err" msg={errors.email} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className="text-sm font-medium">Subject</label>
        <input id="cf-subject" value={v.subject} onChange={set('subject')} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'cf-subject-err' : undefined} className={`${field} ${errors.subject ? 'border-[#fda4af]' : 'border-line'}`} />
        <Err id="cf-subject-err" msg={errors.subject} />
      </div>
      <div>
        <label htmlFor="cf-message" className="text-sm font-medium">Message</label>
        <textarea id="cf-message" rows={6} value={v.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} className={`${field} resize-y ${errors.message ? 'border-[#fda4af]' : 'border-line'}`} />
        <Err id="cf-message-err" msg={errors.message} />
      </div>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Do not fill this in<input tabIndex={-1} autoComplete="off" value={v.botcheck} onChange={set('botcheck')} /></label>
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
        {status === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send message</>}
      </button>

      <div id="cf-status" role="status" aria-live="polite" className="text-sm">
        {status === 'success' && <p className="text-cyan">Thank you. Your message was sent.</p>}
        {status === 'error' && <p className="text-[#fda4af]">Message not sent. {detail}</p>}
        {status === 'unconfigured' && (
          <p className="text-amber">The form is not connected yet: add a Web3Forms access key (see README). Nothing was sent.</p>
        )}
      </div>
    </form>
  )
}

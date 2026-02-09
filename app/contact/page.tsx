import { ContactForm } from '@/components/contact-form'

export const metadata = {
  title: 'contact',
}

export default function ContactPage() {
  const formId = Number(process.env.CF7_FORM_ID) || 0
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold">contact</h1>
      <p className="mt-2 text-dark-500">get in touch</p>

      <div className="mt-8">
        {formId ? (
          <ContactForm formId={formId} recaptchaSiteKey={recaptchaSiteKey} />
        ) : (
          <p className="text-dark-500">contact form not configured</p>
        )}
      </div>
    </section>
  )
}

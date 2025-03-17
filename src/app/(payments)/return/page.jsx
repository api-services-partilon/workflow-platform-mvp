import { redirect } from 'next/navigation'

import { stripe } from '../../../lib/stripe'

export default async function Return({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
      <section id="success" className="p-6 bg-green-100 border border-green-300 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-green-800">Thank You for Your Order!</h2>
        <p className="text-gray-700 mt-2">
          We appreciate your business! A confirmation email will be sent to{' '}
          <span className="font-medium text-black">{customerEmail}</span>. 
          If you have any questions, feel free to reach out to us at{' '}
          <a href="mailto:orders@example.com" className="text-blue-600 hover:underline">
            orders@example.com
          </a>.
        </p>
      </section>
      </div>
    )
  }
}
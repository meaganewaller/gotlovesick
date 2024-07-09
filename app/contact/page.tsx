import { HiEnvelope } from 'react-icons/hi2';
import SuperLink from '@/components/links/standard';

export const metadata = {
  title: 'Contact'
}

export default function Contact() {
  return (
    <div className="mx-auto mb-8 mt-6 flex max-w-xl flex-col gap-4 p-4 text-center">
      <h1 className="text-4xl font-bold text-primary">Contact</h1>
      <p>
        Whether you want to discuss an opportunity, ask a question, or just say
        hi, now is the perfect time to reach out! I&apos;ll do my best to get
        back to you as soon as possible.
      </p>
      <div className="mt-4 flex flex-col items-center gap-8">
      <div className='indicator'>
      <span className='badge indicator-item badge-primary'>Fast</span>
      <SuperLink href='mailto:meagan@meaganwaller.com' className='btn w-fit'>
      <HiEnvelope className='h-4 w-4' />
      meagan@meaganwaller.com
      </SuperLink>
      </div>
      </div>
    </div>
  );
}

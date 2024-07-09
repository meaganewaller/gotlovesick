import { createClient } from "@/utils/supabase/server";
import Image from 'next/image'
import Avatar from '@/public/pixel-avatar.webp'
import { FiGithub, FiInstagram, FiX } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa'
import SuperLink from '@/components/links/standard';

function AvatarComponent({ className }: { className?: string }) {
  return (
    <Image src={Avatar} alt="Meagan's avatar." className={className}/>
  )
}

export default async function Index() {
  return (
    <div className="hero my-4">
      <div className='hero-content max-w-5xl flex-row gap-16'>
        <AvatarComponent className='avatar mb-6 h-40 w-40 rounded-full shadow-halo-secondary lg:avatar' />
        <div>
          <AvatarComponent className='avatar mb-6 h-16 w-16 rounded-full shadow-halo-secondary-sm xs:hidden' />
          <p>welcome to my</p>
          <h1 className='mb-4 mt-2 text-2xl font-bold leading-tight xs:text-3xl lg:text-4xl'>
            <span classNamne='text-primary'>
              secret gardens{' '}
              <span className='whitespace-nowrap italic text-sm'>
                or lunar valleys
              </span>
            </span>
            <br />i have lots of interests.
          </h1>
          <p className='max-w-xl text-sm leading-relaxed xs:text-base'>
            i just want to be known for the things that i <span className='italic tracking-wider font-serif'>love</span>
          </p>
          <div className='mt-6 flex flex-row items-center justify-start gap-4'>
            <AvatarComponent className='mr-4 hidden h-16 w-16 rounded-full shadow-halo-secondary-sm xs:avatar sm:h-20 sm:w-20 lg:hidden' />
            <SuperLink href='/blog' className='btn btn-primary shadow-halo-primary-sm'>Check out the blog!</SuperLink>
            <div className='flex-row gap-2'>
              <div className='flex gap-1'>
                <SuperLink href='https://github.com/meaganewaller' external styledIcon>
                  <FiGithub className='h-4 w-4' />
                </SuperLink>
                <SuperLink href='https://twitter.com' external styledIcon>
                  <FiX className='h-4 w-4' />
                </SuperLink>
                <SuperLink href='https://tiktok.com/gotlovesickallovermybed' external styledIcon>
                  <FaTiktok className='h-4 w-4' />
                </SuperLink>
                <SuperLink href='https://instagram.com/' external styledIcon><FiInstagram className='h-4 w-4' /></SuperLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

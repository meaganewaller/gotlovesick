import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: '../../public/fonts/basiic.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
})

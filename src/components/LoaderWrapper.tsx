'use client';

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Loader from './loader'
export default function LoaderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return loading ? <Loader /> : children;
}

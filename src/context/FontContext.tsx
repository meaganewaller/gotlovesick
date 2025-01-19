'use client';

import { createContext, useEffect, useState, ReactNode } from 'react'
import Loader from '@/components/loader'

type FontContextType = {
  fontClass?: string
  changeFontClass?: (nextFontClass: string) => void
}

export const FontContext = createContext<FontContextType>({})

type FontProviderProps = {
  children: ReactNode
}

export const FontProvider: React.FC<FontProviderProps> = ({
  children,
}: FontProviderProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [fontClass, setFontClass] = useState<string>('')

  const changeFontClass = (nextFont: string) => {
    setFontClass(nextFont)
    localStorage.setItem('font', nextFont)
  }

  // #region -- Load Font
  const loadFont = () => {
    const storedFont = localStorage.getItem('font') || ''
    setFontClass(storedFont)
    setIsMounted(true)
  }

  useEffect(() => {
    setTimeout(loadFont, 300)
  }, [])

  if (!isMounted) {
    return <Loader />
  }

  return (
    <FontContext.Provider value={{ fontClass, changeFontClass }}>
      {children}
    </FontContext.Provider>
  )
}

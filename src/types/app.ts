import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayoutOptions = {
  isHome?: boolean;
};

export type NextPageWithLayout<T = object> = NextPage<T> & {
  getLayout?: (
    page: ReactElement,
    options: NextPageWithLayoutOptions
  ) => ReactNode;
};

// modified version - allows custom pageProps type, falling back to 'unknown'
type AppProps<P = unknown> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type Position = 'bottom' | 'center' | 'left' | 'right' | 'top';

/** Spacing keys defined has CSS variables */
export type Spacing = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type Validator<T> = (value: unknown) => value is T;

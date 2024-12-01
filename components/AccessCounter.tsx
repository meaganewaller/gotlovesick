import * as React from 'react'
import Script from 'next/script'

export default function AccessCounter() {
  return (
    <div>
      <Script id="access-counter" src="/scripts/fc2Counter.js"></Script>
      <span id="fc2Counter"></span>&nbsp;
    </div>
  )
}

'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function PageWrapper({ children }) {
  const router = useRouter()

  return (
    <div className="wrapper">
      {children}
    </div>
  )
}
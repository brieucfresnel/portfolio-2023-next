'use client';

import './PageWrapper.scss';

export default function PageWrapper({ children }) {
  return (
    <div className="wrapper">
      {children}
    </div>
  )
}
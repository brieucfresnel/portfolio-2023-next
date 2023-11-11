import React from "react"
import "./Pill.scss"
import cn from "classnames"

export default function Pill({ children, bgColor, size = "sm", href = false }) {
  return href ? (
    <a
      href={href}
      className={cn("pill", bgColor ? `pill--${bgColor}` : "", `pill--${size}`)}
    >
      {children}
    </a>
  ) : (
    <span className={`pill pill--${bgColor}`}>{children}</span>
  )
}

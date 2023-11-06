
import React from 'react';
import './Pill.scss'

export default function Pill({ label, bgColor }) {
  return (
    <span className={`pill pill--${bgColor}`}>{label}</span>
  )
}

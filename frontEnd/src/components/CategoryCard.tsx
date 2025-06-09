import React from 'react'
import '../index.css'

export default function CategoryCard({ type, label }) {
  return (
    <div className={`card ${type}`}>
      <div className="icon" />
      <span>{label}</span>
    </div>
  )
}

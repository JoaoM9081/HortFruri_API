import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoryCard from '../components/CategoryCard'
import '../index.css'

export default function Home() {
  return (
    <div className="hf-container">
      <Header />

      <main className="hf-main">
        <h1>Peça alimentos frescos de hortifrúti</h1>
        <p>Frutas e vegetais da melhor qualidade entregues na sua casa.</p>
        <div className="hero-img" />

        <div className="hf-categories">
          <CategoryCard type="ofertas"   label="Ofertas" />
          <CategoryCard type="frutas"    label="Frutas" />
          <CategoryCard type="vegetais"  label="Vegetais" />
          <CategoryCard type="graos"     label="Grãos" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

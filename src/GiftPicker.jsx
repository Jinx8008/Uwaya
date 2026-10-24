import { useRef, useState } from 'react'
import iphone from './assets/img/18pro.jpeg'
import samsung from './assets/img/26ultra.jpeg'
import bmw from './assets/img/x6m.jpeg'
import mercedes from './assets/img/g63s.jpeg'
import bombardier from './assets/img/bombardia.jpeg'
import gulfstream from './assets/img/Gulfstream G700.jpeg'
import sunseeker from './assets/img/Ikal_ A first look at the interiors of the 30m Sunseeker 100 yacht.jpeg'
import princess from './assets/img/The new Princess X95 is turning heads.jpeg'
import './GiftPicker.css'
import BirthdayHub from './BirthdayHub.jsx'

const sections = [
  { title: 'First, a little upgrade.', category: 'Phones', caption: 'For all your birthday selfies. Which one is yours?', options: [{ name: 'iPhone 18 Pro Max', image: iphone }, { name: 'Samsung Galaxy S26 Ultra', image: samsung }] },
  { title: 'Your birthday ride.', category: 'Cars', caption: 'Birthday girl in the front seat. Pick your keys.', options: [{ name: 'BMW X6 M', image: bmw }, { name: 'Mercedes-AMG G63', image: mercedes }] },
  { title: 'Forget economy.', category: 'Private jets', caption: 'Where are we flying next? Choose your wings.', options: [{ name: 'Gulfstream G700', image: gulfstream }, { name: 'Bombardier Global 7500', image: bombardier }] },
  { title: 'A little ocean energy.', category: 'Yachts', caption: 'Because a birthday cruise sounds about right.', options: [{ name: 'Sunseeker 100 Yacht', image: sunseeker }, { name: 'Princess X95', image: princess }] },
]

export default function GiftPicker() {
  const [showHub, setShowHub] = useState(false)
  const [slide, setSlide] = useState(0)
  const [choices, setChoices] = useState({})
  const [finished, setFinished] = useState(false)
  const heading = useRef(null)
  const touchStart = useRef(null)
  const section = sections[slide]

  function navigate(next) {
    setSlide(next)
    requestAnimationFrame(() => heading.current?.focus())
  }

  function advance() {
    if (!choices[slide]) return
    if (slide === sections.length - 1) {
      setFinished(true)
      requestAnimationFrame(() => heading.current?.focus())
    } else navigate(slide + 1)
  }

  if (showHub) return <BirthdayHub onBack={() => setShowHub(false)} />

  return (
    <section className="gift-page" aria-label="Birthday gift wishlist">
      <header className="gift-header">
        <span className="eyebrow">UWAYA’S BIRTHDAY COLLECTION</span>
        <span className="gift-seal" aria-hidden="true">✦</span>
        <h1>Birthday girl,<br /><em>pick your gifts.</em></h1>
        <p>Pick all the things you want me to buy for you.<br />One from each section. Dream big, okay? 💙</p>
      </header>
      {finished ? (
        <div className="gift-summary">
          <span className="eyebrow">EXQUISITE TASTE, AS EXPECTED</span>
          <h2 ref={heading} tabIndex={-1}>Your birthday wishlist ✨</h2>
          <p>Okayyy, I see your taste 😂💙</p>
          <ul>{sections.map((item, i) => <li key={item.category}><img src={choices[i].image} alt="" /><div><small>{item.category}</small><strong>{choices[i].name}</strong></div><span aria-label="Selected">✓</span></li>)}</ul>
          <button type="button" onClick={() => { setShowHub(true); window.scrollTo({ top: 0, behavior: 'instant' }) }}>Your next surprise 💙 →</button>
          <button type="button" onClick={() => { setFinished(false); navigate(0) }}>Edit my picks ↺</button>
        </div>
      ) : (
        <>
          <nav className="gift-progress" aria-label="Gift categories">
            {sections.map((item, i) => <button key={item.category} type="button" className={slide === i ? 'active' : ''} aria-current={slide === i ? 'step' : undefined} disabled={i > slide && !sections.slice(0, i).every((_, n) => choices[n])} onClick={() => navigate(i)}><span>{choices[i] ? '✓' : `0${i + 1}`}</span>{item.category}</button>)}
          </nav>
          <div className="gift-slide" key={slide} onTouchStart={e => { touchStart.current = e.touches[0].clientX }} onTouchEnd={e => {
            if (touchStart.current === null) return
            const distance = touchStart.current - e.changedTouches[0].clientX
            if (distance > 70 && choices[slide]) advance()
            else if (distance < -70 && slide > 0) navigate(slide - 1)
            touchStart.current = null
          }}>
            <div className="gift-section-heading"><span className="eyebrow">{section.category} · 0{slide + 1} / 04</span><h2 ref={heading} tabIndex={-1}>{section.title}</h2><p>{section.caption}</p></div>
            <div className="gift-options" role="group" aria-label={`Choose your ${section.category.toLowerCase()}`}>
              {section.options.map(option => <button type="button" key={option.name} className={`gift-card ${choices[slide]?.name === option.name ? 'selected' : ''}`} aria-pressed={choices[slide]?.name === option.name} onClick={() => setChoices(current => ({ ...current, [slide]: option }))}>
                <div className="gift-photo"><img src={option.image} alt={option.name} /><span className="gift-check" aria-hidden="true">{choices[slide]?.name === option.name ? '✓' : '+'}</span></div>
                <div className="gift-card-caption"><small>{choices[slide]?.name === option.name ? 'YOUR PICK' : 'TAP TO CHOOSE'}</small><h3>{option.name}</h3></div>
              </button>)}
            </div>
            <div className="gift-controls"><button type="button" className="gift-back" disabled={slide === 0} onClick={() => navigate(slide - 1)}>← Back</button><button type="button" disabled={!choices[slide]} onClick={advance}>{slide === 3 ? 'See my wishlist' : 'Next category'} →</button></div>
            <p className="gift-hint" role="status">{choices[slide] ? `${choices[slide].name} — good choice 💙` : 'Choose your favourite to continue'}</p>
          </div>
        </>
      )}
      <footer className="gift-footer">Only the finest for the birthday girl. ♡</footer>
    </section>
  )
}


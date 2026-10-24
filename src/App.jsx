import { useEffect, useRef, useState } from 'react'
import './App.css'
import GiftPicker from './GiftPicker.jsx'

const particles = Array.from({ length: 36 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`,
  '--size': `${1 + (i % 3) * 0.6}px`, '--duration': `${16 + (i % 7) * 3}s`,
  '--delay': `${-i * 2.7}s`, '--opacity': 0.18 + (i % 5) * 0.1,
  '--drift': `${i % 2 === 0 ? 24 : -24}px`,
}))
const approvedName = ['uwaya', 'rebecca', 'oshioneh', 'amarachi'].sort().join(' ')
const teasing = [
  { title: 'Wait... 19?!', text: 'When did you turn 19?? Like ion understand? since when??? 😭', button: 'Yes, nineteen You Dumbass 😂' },
  { title: 'Mehn, you’re really getting old 😂', text: 'Okay Mah Love, your special day is officially unlocked. 💙', button: 'Okay, let me in!' },
]

function App() {
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [home, setHome] = useState(false)
  const [step, setStep] = useState(0)
  const dialog = useRef(null)

  useEffect(() => {
    if (unlocked && !dialog.current.open) dialog.current.showModal()
  }, [unlocked])

  function checkBirthday(event) {
    event.preventDefault()
    const normalized = name.trim().toLowerCase().split(/\s+/).sort().join(' ')
    if (normalized !== approvedName) {
      setError('Hmm, this invitation needs all four of your names. Any order works 💙')
    } else if (Number(day) !== 24 || Number(month) !== 10) {
      setError('That birthday doesn’t match our birthday girl. Try again 👀')
    } else if (Number(age) !== 19) {
      setError('Are you sure about that age? Try again, birthday girl 😂')
    } else {
      setError('')
      setStep(0)
      setUnlocked(true)
    }
  }

  function continueSurprise() {
    if (step < teasing.length - 1) setStep(step + 1)
    else {
      dialog.current.close()
      setHome(true)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <>
      <div className="dust" aria-hidden="true">
        {particles.map((style, i) => <span className="dust-particle" key={i} style={style} />)}
      </div>
      <main className="welcome">
        {home ? (
          <GiftPicker />
        ) : (
          <section className="invitation" aria-labelledby="welcome-title">
            <span className="eyebrow">AN INVITATION FOR ONE</span>
            <div className="emblem" aria-hidden="true">✦</div>
            <h1 id="welcome-title">A day as special<br />as <em>you Baby Gurrll.</em></h1>
            <p>A little birthday magic is waiting.<br />First, prove you’re our birthday girl.</p>
            <form onSubmit={checkBirthday}>
              <label htmlFor="birthday-name">Your full name</label>
              <input id="birthday-name" value={name} onChange={e => { setName(e.target.value); setUnlocked(false) }} autoComplete="name" placeholder="All four names, your order" required />
              <fieldset>
                <legend>Your birthday password</legend>
                <div className="birthday-fields">
                  <div><label htmlFor="day">Day</label><input id="day" type="number" inputMode="numeric" min="1" max="31" placeholder="DD" value={day} onChange={e => { setDay(e.target.value); setUnlocked(false) }} required /></div>
                  <div><label htmlFor="month">Month</label><select id="month" value={month} onChange={e => { setMonth(e.target.value); setUnlocked(false) }} required><option value="" disabled>Month</option>{['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select></div>
                </div>
              </fieldset>
              <label htmlFor="age">How old are you now? 👀</label>
              <input id="age" type="number" inputMode="numeric" min="1" max="120" placeholder="Be honest..." value={age} onChange={e => { setAge(e.target.value); setUnlocked(false) }} required />
              {error && <p className="form-error" role="alert">{error}</p>}
              {unlocked ? <button type="button" onClick={() => setHome(true)}>Enter your birthday world <span>→</span></button> : <button type="submit">Unlock my surprise <span>✧</span></button>}
            </form>
            <span className="footnote">Made for you. Only you. ♡</span>
          </section>
        )}
      </main>
      <dialog ref={dialog} className="birthday-dialog" onCancel={e => e.preventDefault()} aria-labelledby="tease-title" aria-describedby="tease-text">
        <span className="eyebrow">HOLD ON, BIRTHDAY GIRL</span>
        <h2 id="tease-title">{teasing[step].title}</h2>
        <p id="tease-text">{teasing[step].text}</p>
        <button type="button" onClick={continueSurprise}>{teasing[step].button}</button>
      </dialog>
    </>
  )
}

export default App



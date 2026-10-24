import { useEffect, useState } from 'react'
import './BirthdayHub.css'
import starterBooks from './starterBooks.js'

// Your birthday letter, exactly as provided.
const birthdayMessage = "Happy birthday, mah love, my one and only Oshioneh, the love of my life 😭💙\n\nWishing you long life and prosperity, and all the best things this useless world has to offer.\n\nI would have wished you more knowledge and wisdom, but omor, you’re already smart asf, so what’s there kwanu to add? But sha, I still wish you more knowledge and wisdom… that doesn’t sound right.\n\nMore knowledge and understanding?? 🤔\n\nOmor, you know what I’m trying to say abeg 😭\n\nAnyways, I wish you success in whatever you put your hands to, like your makeup brand. (YK, you might as well just tell me the name of the brand at this point.)\n\nBut anyways, I apologise for not taking my life seriously and hustling to spoil you the way I wanted to on your birthday. YK, every year I’m always like, “This is what I’m gonna do for Uwaya on her birthday,” and when that time comes, my village people then decide that’s the time to come meet me and leave me broke 😭\n\nBut DW, one day when I guide, I’ll spoil you like mad, and I’LL TAKE YOU ROUND THE WORLDDD!!\n\nBut for now, I’m broke, and you know that, so the only thing my stupid ass managed to do was build you a stupid-ass site. Like, this is not what I planned, but it is well.\n\nAnd the worst part is that I didn’t even get to send this kin site on time because of some stupid-ass reasons, but it is well 😭\n\nAnyways, I hope you love the books. I basically don’t know anything about books, like the genres or something like that, so I just found some with catchy names that are similar to the ones you’ve asked me to download for you before. Anyways, I hope you enjoy them. LOVE YOU 💙\n\nAnd also, this isn’t your present. It’s just a birthday letter. When I guide, I’ll take you out and spoil you like the baby you are.\n\nAnyways, enjoy your day. You deserve the world, Your Highness 👑💙"
const genres = [['All books', ''], ['Romance', 'romance'], ['Gothic stories', 'gothic'], ['Mystery & twists', 'mystery'], ['Drama', 'drama']]

function Library() {
  const [topic, setTopic] = useState('')
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 20000)
    async function load() {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams({ languages: 'en', copyright: 'false', topic, search: query, page: String(page) })
        const response = await fetch(`https://gutendex.com/books/?${params}`, { signal: controller.signal })
        if (!response.ok) throw new Error('Unavailable')
        const result = await response.json()
        if (!Array.isArray(result.results)) throw new Error('Invalid response')
        if (active) setData(current => page > 1 && current ? { ...result, results: [...current.results, ...result.results.filter(book => !current.results.some(existing => existing.id === book.id))] } : result)
      } catch {
        if (active) setError('The bookshelves could not load. Please try again.')
      } finally { clearTimeout(timeout); if (active) setLoading(false) }
    }
    load()
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [topic, query, page, retry])
  const fallbackBooks = starterBooks.filter(book => (!topic || book.topics.includes(topic)) && `${book.title} ${book.authors[0].name}`.toLowerCase().includes(query.toLowerCase()))
  const books = data?.results || fallbackBooks
  function resetShelf() { setPage(1); setData(null) }
  return <>
    <span className="eyebrow">MY PRESENT FOR YOU</span><h1>A thousand worlds.<br /><em>Just for you.</em></h1><p>For the romance, the drama, and the “one more chapter” nights. 💙</p>
    <button type="button" className="library-scroll-hint" onClick={() => document.getElementById('book-shelves')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })}>
      <span>YOUR BOOKS ARE JUST BELOW</span>
      Scroll to explore your books <span className="scroll-arrow" aria-hidden="true">↓</span>
    </button>
    <div className="library-genres">{genres.map(([label, value]) => <button type="button" key={value} aria-pressed={topic === value} onClick={() => { setTopic(value); resetShelf() }}>{label}</button>)}</div>
    <form className="library-search" onSubmit={e => { e.preventDefault(); setQuery(search.trim()); resetShelf() }}><label htmlFor="book-search">Search titles or authors</label><input id="book-search" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Try Jane Austen or Jane Eyre" /><button type="submit">Search the shelves</button></form>
    <p className="library-note">Classic books from Project Gutenberg. Gothic stories are older dark tales, rather than modern dark romance. Read / download opens the source page to choose a format. Copyright availability varies by country.</p>
    <div aria-live="polite" aria-busy={loading}>
      <h2 id="book-shelves" className="shelf-heading">{query ? 'Your search results' : 'Your bookshelves'}</h2>
      <p className="library-note">{data ? `${books.length} of ${data.count.toLocaleString()} books` : `${books.length} books on your starter shelf`}</p>
      {loading && <p className="library-note">Your starter shelf is ready. Loading the online catalogue…</p>}
      {error && <div><p className="library-note" role="status">The online catalogue is unavailable. You can still browse and download from your starter shelf.</p><button type="button" onClick={() => setRetry(retry + 1)}>Retry online catalogue</button></div>}
      {books.length === 0 && <p>No books found. Try another category or clear your search.</p>}
      <div className="book-grid">{books.map(book => <article className="book-card" key={book.id}><div className="book-cover" aria-hidden="true"><small>UWAYA’S LIBRARY</small><strong>{book.title}</strong><span>✦</span></div><h2>{book.title}</h2><p>{book.authors.map(author => author.name).join(' · ') || 'Unknown author'}</p><a href={`https://www.gutenberg.org/ebooks/${book.id}`} target="_blank" rel="noopener noreferrer">Read / download ↗</a></article>)}</div>
      {data?.next && <button type="button" disabled={loading} onClick={() => setPage(page + 1)}>{loading ? 'Loading…' : 'Load more books ↓'}</button>}
      {query && <button type="button" onClick={() => { setQuery(''); setSearch(''); resetShelf() }}>Clear search · Browse books</button>}
    </div><p className="library-note">Catalogue by <a href="https://gutendex.com/" target="_blank" rel="noopener noreferrer">Gutendex</a> · Books from <a href="https://www.gutenberg.org/" target="_blank" rel="noopener noreferrer">Project Gutenberg</a></p>
  </>
}
export default function BirthdayHub({ onBack }) {
  const [view, setView] = useState('hub')
  function open(next) { setView(next); window.scrollTo({ top: 0, behavior: 'instant' }) }
  return <section className="birthday-hub"><button className="hub-back" type="button" onClick={() => view === 'hub' ? onBack() : open('hub')}>← {view === 'hub' ? 'My wishlist' : 'Your surprises'}</button>
    {view === 'hub' ? <><span className="eyebrow">THE BEST PART IS STILL AHEAD</span><div className="emblem">♡</div><h1>Two little things,<br /><em>from me to you.</em></h1><p>Something for your heart.<br />And something for your next chapter.</p><div className="hub-links"><button type="button" onClick={() => open('message')}><span>✉</span><h2>A message for you</h2><p>A little note for my birthday girl.</p></button><button type="button" onClick={() => open('library')}><span>✦</span><h2>My present for you</h2><p>A library of love, drama, and plot twists.</p></button></div></> : view === 'message' ? <><span className="eyebrow">WORDS FROM ME</span><h1>Dear <em>Uwaya,</em></h1><article className="birthday-letter">{birthdayMessage ? birthdayMessage.split('\n\n').map((text, i) => <p key={i}>{text}</p>) : <p>Your personal birthday message will go here. 💙</p>}</article></> : <Library />}
  </section>
}




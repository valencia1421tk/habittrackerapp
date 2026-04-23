import { useState, useRef } from 'react'
import { sumRecorded } from '../hooks/useHabits'
import { useLang } from '../i18n/LanguageContext'

const QUOTE_KEY = 'habit-tracker-quote'

const pad = n => String(n).padStart(2, '0')
const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`

function calcStreak(logs) {
  const today = toDateStr(new Date())
  const yesterday = toDateStr(new Date(Date.now() - 86400000))
  const done = new Set(logs.filter(l => l.status === 'completed').map(l => l.date))
  const start = done.has(today) ? today : done.has(yesterday) ? yesterday : null
  if (!start) return 0
  let streak = 0
  const cur = new Date(start + 'T12:00:00')
  while (done.has(toDateStr(cur))) {
    streak++
    cur.setDate(cur.getDate() - 1)
  }
  return streak
}

function MiniRing({ pct, isDone }) {
  const r = 17
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.min(pct / 100, 1))
  const color = isDone ? '#22c55e' : '#8b5cf6'
  return (
    <svg width="42" height="42" className="rotate-[-90deg] shrink-0">
      <circle cx="21" cy="21" r={r} fill="none" stroke="#1e293b" strokeWidth="5" />
      <circle cx="21" cy="21" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        className="transition-all duration-700" />
    </svg>
  )
}

function QuoteWidget({ t }) {
  const [quote, setQuote] = useState(() => localStorage.getItem(QUOTE_KEY) || '')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef(null)

  function startEdit() {
    setDraft(quote)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function save() {
    const val = draft.trim()
    setQuote(val)
    localStorage.setItem(QUOTE_KEY, val)
    setEditing(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter') save()
    if (e.key === 'Escape') setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 mt-3">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t.quote_placeholder}
          className="flex-1 bg-transparent border-b border-violet-500/50 text-slate-300 text-sm py-1 focus:outline-none placeholder-slate-600"
        />
        <button onClick={save} className="text-xs text-violet-400 px-2 py-1 shrink-0">{t.quote_save}</button>
        <button onClick={() => setEditing(false)} className="text-xs text-slate-600 px-1 py-1 shrink-0">×</button>
      </div>
    )
  }

  if (quote) {
    return (
      <button onClick={startEdit} className="mt-3 text-left group w-full">
        <p className="text-slate-500 text-xs italic leading-relaxed group-active:text-slate-400 transition-colors">
          &ldquo;{quote}&rdquo;
        </p>
      </button>
    )
  }

  return (
    <button onClick={startEdit} className="mt-3 flex items-center gap-1.5 text-slate-700 hover:text-slate-500 transition-colors">
      <span className="text-xs">{t.quote_add}</span>
    </button>
  )
}

function HelpModal({ onClose }) {
  const { t } = useLang()
  const [idx, setIdx] = useState(0)
  const topic = t.help_topics[idx]
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-sm max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-800">
          <p className="text-white font-bold text-base">{t.help_title}</p>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm transition-colors">{t.help_close}</button>
        </div>
        <div className="flex gap-2 px-5 pt-4 pb-2 flex-wrap">
          {t.help_topics.map((tp, i) => (
            <button key={tp.id} onClick={() => setIdx(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i === idx ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
              {tp.title}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <p className="text-sm font-semibold text-violet-300 mb-2">{topic.title}</p>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{topic.body}</p>
        </div>
      </div>
    </div>
  )
}

function LanguageSwitcher() {
  const { lang, switchLang, LANGUAGES } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs font-medium hover:bg-white/10 transition-colors"
      >
        {LANGUAGES.find(l => l.code === lang)?.label}
        <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-20 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl min-w-[110px]">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => { switchLang(l.code); setOpen(false) }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  lang === l.code
                    ? 'text-violet-400 bg-violet-500/10 font-medium'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function HabitList({ habits, onSelect, onAdd }) {
  const { t } = useLang()
  const [showArchived, setShowArchived] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const active = habits.filter(h => !h.archived)
  const archived = habits.filter(h => h.archived)

  const avgPct = active.length === 0 ? 0
    : Math.round(active.reduce((s, h) => s + Math.min(sumRecorded(h.logs) / h.goalTotal, 1), 0) / active.length * 100)
  const doneCount = active.filter(h => sumRecorded(h.logs) >= h.goalTotal).length

  function periodLabel(habit) {
    if (habit.period === 'week') return t.period_week
    if (habit.period === 'month') return t.period_month
    return t.period_custom(habit.periodDays)
  }

  function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return t.greeting_morning
    if (h < 18) return t.greeting_afternoon
    return t.greeting_evening
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* ── Header ── */}
      <div className="relative overflow-hidden px-5 pt-14 pb-8">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
        <div className="absolute top-8 -left-20 w-48 h-48 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

        <div className="relative">
          {/* Top row: brand + help + language switcher */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-violet-400/80 text-xs font-semibold tracking-[0.2em] uppercase">Habit Tracker</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHelp(true)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-bold hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
              >
                ?
              </button>
              <LanguageSwitcher />
            </div>
          </div>

          <p className="text-slate-400 text-sm mb-1">{getGreeting()}</p>
          <QuoteWidget t={t} />
          <h1 className="text-3xl font-black text-white tracking-tight mt-3">{t.page_title}</h1>

          {active.length > 0 && (
            <div className="flex gap-4 mt-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 flex-1">
                <p className="text-xs text-slate-400 mb-0.5">{t.stat_count}</p>
                <p className="text-white font-bold text-lg leading-none">
                  {active.length}
                  {t.stat_count_unit && <span className="text-slate-400 text-xs font-normal ml-1">{t.stat_count_unit}</span>}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 flex-1">
                <p className="text-xs text-slate-400 mb-0.5">{t.stat_avg}</p>
                <p className="text-violet-300 font-bold text-lg leading-none">
                  {avgPct}
                  <span className="text-slate-400 text-xs font-normal ml-0.5">%</span>
                </p>
              </div>
              {doneCount > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl px-4 py-2.5 flex-1">
                  <p className="text-xs text-green-400/70 mb-0.5">{t.stat_done}</p>
                  <p className="text-green-400 font-bold text-lg leading-none">
                    {doneCount}
                    {t.stat_done_unit && <span className="text-green-400/60 text-xs font-normal ml-1">{t.stat_done_unit}</span>}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Habit list ── */}
      <div className="flex-1 px-5 pb-8">
        {active.length === 0 && archived.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="16" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="4 3" opacity="0.6"/>
                  <path d="M14 22 L20 28 L30 16" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <span className="text-violet-400 text-xs font-bold">+</span>
              </div>
            </div>
            <p className="text-white font-semibold text-base">{t.empty_title}</p>
            <p className="text-slate-500 text-sm mt-1 mb-5">{t.empty_desc}</p>
            <button onClick={onAdd}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl text-white font-bold text-sm shadow-lg shadow-violet-500/25 active:scale-95 transition-transform">
              {t.empty_btn}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {active.length === 0 && (
              <div className="py-6 text-center">
                <p className="text-slate-500 text-sm mb-3">{t.no_active}</p>
                <button onClick={onAdd}
                  className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl text-white font-bold text-sm shadow-lg shadow-violet-500/25 active:scale-95 transition-transform">
                  {t.add_new}
                </button>
              </div>
            )}
            {active.map(habit => {
              const recorded = sumRecorded(habit.logs)
              const pct = Math.min(Math.round((recorded / habit.goalTotal) * 100), 100)
              const isDone = recorded >= habit.goalTotal
              const remaining = Math.max(habit.goalTotal - recorded, 0)
              const streak = calcStreak(habit.logs)

              return (
                <button key={habit.id} onClick={() => onSelect(habit.id)}
                  className="w-full text-left rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>

                  <div className={`h-0.5 w-full ${isDone ? 'bg-green-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'}`}
                    style={{ opacity: Math.max(pct / 100, 0.15) }} />

                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <MiniRing pct={pct} isDone={isDone} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xs font-bold leading-none ${isDone ? 'text-green-400' : 'text-violet-300'}`}>
                            {isDone ? '✓' : `${pct}%`}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white font-bold text-base truncate">{habit.type}</p>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {streak > 0 && (
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                streak >= 7 ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                : streak >= 3 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-amber-500/10 text-amber-400/80 border border-amber-500/20'
                              }`}>
                                🔥 {streak}{t.stat_count_unit === '個' ? '日' : 'd'}
                              </span>
                            )}
                            {isDone && (
                              <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/25 rounded-full px-2 py-0.5">{t.badge_done}</span>
                            )}
                          </div>
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {periodLabel(habit)} · {t.weekly_days(habit.weeklyDays)} · {t.per_day(habit.dailyAmount, habit.unit)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${isDone ? 'bg-green-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'}`}
                        style={{ width: `${pct}%` }} />
                    </div>

                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-slate-600">{recorded.toLocaleString()} {habit.unit} {t.label_achieved}</span>
                      {!isDone && <span className="text-xs text-slate-600">{t.label_remaining} {remaining.toLocaleString()} {habit.unit}</span>}
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Archived section */}
            {archived.length > 0 && (
              <div className="pt-2">
                <button onClick={() => setShowArchived(v => !v)}
                  className="w-full flex items-center justify-between py-2 text-xs text-slate-500 hover:text-slate-400 transition-colors">
                  <span>{t.archive_section(archived.length)}</span>
                  <span className={`transition-transform text-xs ${showArchived ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {showArchived && (
                  <div className="space-y-2 mt-1">
                    {archived.map(habit => {
                      const recorded = sumRecorded(habit.logs)
                      const pct = Math.min(Math.round((recorded / habit.goalTotal) * 100), 100)
                      return (
                        <button key={habit.id} onClick={() => onSelect(habit.id)}
                          className="w-full text-left rounded-2xl overflow-hidden active:scale-[0.98] transition-transform opacity-50"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <MiniRing pct={pct} isDone={pct >= 100} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-xs font-bold leading-none text-slate-400">{pct}%</span>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-slate-400 font-semibold text-sm truncate">{habit.type}</p>
                                  <span className="text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded-full shrink-0">{t.badge_archived}</span>
                                </div>
                                <p className="text-slate-600 text-xs mt-0.5">
                                  {periodLabel(habit)} · {recorded.toLocaleString()} {habit.unit} {t.label_achieved}
                                </p>
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Floating add button ── */}
      <div className="fixed bottom-8 right-5">
        <button onClick={onAdd}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-light shadow-xl shadow-violet-500/40 active:scale-95 transition-transform">
          +
        </button>
      </div>
    </div>
  )
}

import { sumRecorded } from '../hooks/useHabits'

function periodLabel(habit) {
  if (habit.period === 'week') return '1週間'
  if (habit.period === 'month') return '1ヶ月'
  return `${habit.periodDays}日間`
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'おはようございます'
  if (h < 18) return 'こんにちは'
  return 'こんばんは'
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

export default function HabitList({ habits, onSelect, onAdd }) {
  const totalRecorded = habits.reduce((s, h) => s + sumRecorded(h.logs), 0)
  const avgPct = habits.length === 0 ? 0
    : Math.round(habits.reduce((s, h) => s + Math.min(sumRecorded(h.logs) / h.goalTotal, 1), 0) / habits.length * 100)
  const doneCount = habits.filter(h => sumRecorded(h.logs) >= h.goalTotal).length

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* ── Header ── */}
      <div className="relative overflow-hidden px-5 pt-14 pb-8">
        {/* Decorative orbs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
        <div className="absolute top-8 -left-20 w-48 h-48 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="text-violet-400/80 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Habit Tracker</p>
          <p className="text-slate-400 text-sm mb-1">{getGreeting()}</p>
          <h1 className="text-3xl font-black text-white tracking-tight">マイ習慣</h1>

          {habits.length > 0 && (
            <div className="flex gap-4 mt-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 flex-1">
                <p className="text-xs text-slate-400 mb-0.5">習慣数</p>
                <p className="text-white font-bold text-lg leading-none">
                  {habits.length}
                  <span className="text-slate-400 text-xs font-normal ml-1">個</span>
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 flex-1">
                <p className="text-xs text-slate-400 mb-0.5">平均達成率</p>
                <p className="text-violet-300 font-bold text-lg leading-none">
                  {avgPct}
                  <span className="text-slate-400 text-xs font-normal ml-0.5">%</span>
                </p>
              </div>
              {doneCount > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl px-4 py-2.5 flex-1">
                  <p className="text-xs text-green-400/70 mb-0.5">達成済み</p>
                  <p className="text-green-400 font-bold text-lg leading-none">
                    {doneCount}
                    <span className="text-green-400/60 text-xs font-normal ml-1">個</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Habit list ── */}
      <div className="flex-1 px-5 pb-8">
        {habits.length === 0 ? (
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
            <p className="text-white font-semibold text-base">習慣を追加しよう</p>
            <p className="text-slate-500 text-sm mt-1 mb-5">右上の + から目標を設定できます</p>
            <button onClick={onAdd}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl text-white font-bold text-sm shadow-lg shadow-violet-500/25 active:scale-95 transition-transform">
              最初の習慣を追加
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map(habit => {
              const recorded = sumRecorded(habit.logs)
              const pct = Math.min(Math.round((recorded / habit.goalTotal) * 100), 100)
              const isDone = recorded >= habit.goalTotal
              const remaining = Math.max(habit.goalTotal - recorded, 0)

              return (
                <button key={habit.id} onClick={() => onSelect(habit.id)}
                  className="w-full text-left rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>

                  {/* Thin top accent bar */}
                  <div className={`h-0.5 w-full ${isDone ? 'bg-green-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'}`}
                    style={{ opacity: Math.max(pct / 100, 0.15) }} />

                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Mini ring */}
                      <div className="relative">
                        <MiniRing pct={pct} isDone={isDone} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xs font-bold leading-none ${isDone ? 'text-green-400' : 'text-violet-300'}`}>
                            {isDone ? '✓' : `${pct}%`}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white font-bold text-base truncate">{habit.type}</p>
                          {isDone && (
                            <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/25 rounded-full px-2 py-0.5 shrink-0">達成</span>
                          )}
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {periodLabel(habit)} · 週{habit.weeklyDays}日 · {habit.dailyAmount}{habit.unit}/日
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${isDone ? 'bg-green-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'}`}
                        style={{ width: `${pct}%` }} />
                    </div>

                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-slate-600">{recorded.toLocaleString()} {habit.unit} 達成</span>
                      {!isDone && <span className="text-xs text-slate-600">残り {remaining.toLocaleString()} {habit.unit}</span>}
                    </div>
                  </div>
                </button>
              )
            })}
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

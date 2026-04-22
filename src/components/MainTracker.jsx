import { useState, useRef } from 'react'
import { sumRecorded } from '../hooks/useHabits'

const pad = n => String(n).padStart(2, '0')
const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
const todayStr = () => toDateStr(new Date())
const yesterdayStr = () => toDateStr(new Date(Date.now() - 86400000))

function periodLabel(habit) {
  if (habit.period === 'week') return '1週間'
  if (habit.period === 'month') return '1ヶ月'
  return `${habit.periodDays}日間`
}

// ── Build day map from logs ──────────────────────────────────────
function buildDayMap(logs) {
  const map = {}
  logs.forEach(log => {
    if (!map[log.date]) map[log.date] = { completed: 0, skipped: false }
    if (log.status === 'completed') map[log.date].completed += (log.value || 0)
    if (log.status === 'skipped') map[log.date].skipped = true
  })
  return map
}

// ── Circle progress ──────────────────────────────────────────────
function CircleProgress({ percent }) {
  const r = 80
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.min(percent, 1))
  return (
    <svg width="200" height="200" className="rotate-[-90deg]">
      <circle cx="100" cy="100" r={r} fill="none" stroke="#1e1b4b" strokeWidth="16" />
      <circle cx="100" cy="100" r={r} fill="none" stroke="url(#grad)" strokeWidth="16"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        className="transition-all duration-700 ease-out" />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── Month calendar popup ─────────────────────────────────────────
function MonthCalendar({ logs, unit, dailyAmount, onClose, onSelectDate }) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const today = todayStr()
  const dayMap = buildDayMap(logs)

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  // Build grid (Monday first)
  const firstDay = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0).getDate()
  const startPad = (firstDay.getDay() + 6) % 7 // Mon=0

  const cells = []
  for (let i = startPad - 1; i >= 0; i--) {
    cells.push({ date: toDateStr(new Date(year, month, -i)), inMonth: false })
  }
  for (let d = 1; d <= lastDate; d++) {
    cells.push({ date: toDateStr(new Date(year, month, d)), inMonth: true })
  }
  const tail = cells.length % 7
  if (tail > 0) {
    for (let d = 1; d <= 7 - tail; d++) {
      cells.push({ date: toDateStr(new Date(year, month + 1, d)), inMonth: false })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors text-lg">‹</button>
          <h3 className="text-white font-bold text-base">{year}年{month + 1}月</h3>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors text-lg">›</button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {['月','火','水','木','金','土','日'].map(d => (
            <div key={d} className="text-center text-xs text-slate-500 pb-1">{d}</div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map(({ date, inMonth }) => {
            const data = dayMap[date]
            const completed = data?.completed || 0
            const skippedOnly = (data?.skipped) && completed === 0
            const isToday = date === today
            const dayNum = parseInt(date.slice(8), 10)

            let bg = ''
            let numColor = inMonth ? 'text-slate-400' : 'text-slate-700'
            let valColor = 'text-white'

            if (inMonth) {
              if (completed >= dailyAmount) {
                bg = 'bg-violet-500'
                numColor = 'text-white'
              } else if (completed > 0) {
                bg = 'bg-violet-500/35'
                numColor = 'text-violet-200'
                valColor = 'text-violet-200'
              } else if (skippedOnly) {
                bg = 'bg-amber-500/25'
                numColor = 'text-amber-400'
              }
            }

            return (
              <div key={date} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => inMonth && onSelectDate(date)}
                  className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-px transition-opacity ${bg} ${isToday && !bg ? 'ring-1 ring-violet-500' : ''} ${inMonth ? 'active:opacity-60' : 'cursor-default'}`}
                >
                  <span className={`text-xs font-medium leading-none ${numColor} ${isToday && !bg ? 'text-violet-400' : ''}`}>{dayNum}</span>
                  {inMonth && completed > 0 && (
                    <span className={`leading-none font-medium ${valColor}`} style={{ fontSize: '9px' }}>
                      {completed % 1 === 0 ? completed : completed.toFixed(1)}
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-3 mt-4 justify-center flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-violet-500 inline-block" />目標達成</span>
          <span className="text-xs text-slate-400 flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-violet-500/35 inline-block" />部分達成</span>
          <span className="text-xs text-slate-400 flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/25 inline-block" />スキップ</span>
        </div>

        <button onClick={onClose} className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-sm font-medium transition-colors">
          閉じる
        </button>
      </div>
    </div>
  )
}

// ── 7-day bar chart ──────────────────────────────────────────────
function WeekChart({ logs, unit, dailyAmount, onOpenCalendar }) {
  const today = todayStr()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    return toDateStr(d)
  })
  const dayMap = buildDayMap(logs)
  const dayData = days.map(date => ({
    date,
    completed: dayMap[date]?.completed || 0,
    skipped: (dayMap[date]?.skipped) && !(dayMap[date]?.completed),
  }))
  const maxVal = Math.max(dailyAmount, ...dayData.map(d => d.completed), 1)

  return (
    <div className="bg-slate-800/40 rounded-2xl px-4 pt-4 pb-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-400 font-medium">直近7日</p>
        <button onClick={onOpenCalendar}
          className="text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1 rounded-full transition-colors">
          月カレンダー
        </button>
      </div>
      <div className="flex gap-1 items-end">
        {dayData.map(({ date, completed, skipped }) => {
          const barH = completed > 0 ? Math.max((completed / maxVal) * 100, 8) : 0
          const label = new Date(date + 'T12:00:00').toLocaleDateString('ja-JP', { weekday: 'short' })
          const isToday = date === today
          return (
            <div key={date} className="flex-1 flex flex-col items-center gap-0.5">
              <span className="text-xs text-violet-300 font-medium" style={{ minHeight: '1rem' }}>
                {completed > 0 ? (completed % 1 === 0 ? completed : completed.toFixed(1)) : ''}
              </span>
              <div className="w-full flex flex-col justify-end" style={{ height: 56 }}>
                {completed > 0 ? (
                  <div className={`w-full rounded-t transition-all duration-500 ${isToday ? 'bg-violet-400' : 'bg-violet-600/70'}`}
                    style={{ height: `${barH}%` }} />
                ) : skipped ? (
                  <div className="w-full h-1.5 bg-amber-600/50 rounded" />
                ) : (
                  <div className="w-full h-0.5 bg-slate-700 rounded" />
                )}
              </div>
              <span className={`text-xs mt-0.5 ${isToday ? 'text-violet-400 font-semibold' : 'text-slate-500'}`}>{label}</span>
            </div>
          )
        })}
      </div>
      <div className="flex justify-end mt-2 gap-3">
        <span className="text-xs text-slate-600 flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-violet-500/70 inline-block" />記録</span>
        <span className="text-xs text-slate-600 flex items-center gap-1"><span className="w-2 h-1.5 rounded-sm bg-amber-600/50 inline-block" />スキップ</span>
      </div>
    </div>
  )
}

// ── Log item ─────────────────────────────────────────────────────
function LogItem({ log, unit, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(String(log.value ?? ''))
  const [editNote, setEditNote] = useState(log.note || '')
  const [confirmDel, setConfirmDel] = useState(false)

  if (confirmDel) {
    return (
      <div className="flex items-center justify-between py-2.5 px-4 bg-red-900/20 border border-red-800/30 rounded-xl">
        <span className="text-red-300 text-sm">本当に削除しますか？</span>
        <div className="flex gap-2">
          <button onClick={() => setConfirmDel(false)} className="text-xs text-slate-300 px-3 py-1 bg-slate-700 rounded-lg">取消</button>
          <button onClick={onDelete} className="text-xs text-white px-3 py-1 bg-red-500 rounded-lg font-medium">削除</button>
        </div>
      </div>
    )
  }

  if (editing) {
    return (
      <div className="py-3 px-4 bg-slate-800 border border-slate-600 rounded-xl space-y-2">
        {log.status === 'completed' && (
          <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-3 py-2">
            <input type="number" value={editVal} onChange={e => setEditVal(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
            <span className="text-slate-400 text-xs">{unit}</span>
          </div>
        )}
        <input type="text" placeholder="メモ（任意）" value={editNote} onChange={e => setEditNote(e.target.value)}
          className="w-full bg-slate-900 rounded-lg px-3 py-2 text-white text-sm focus:outline-none placeholder-slate-600" />
        <div className="flex gap-2">
          <button onClick={() => setEditing(false)} className="flex-1 py-2 bg-slate-700 rounded-lg text-sm text-slate-300">取消</button>
          <button onClick={() => { onUpdate({ value: editVal, status: log.status, note: editNote }); setEditing(false) }}
            className="flex-1 py-2 bg-violet-500 rounded-lg text-sm text-white font-medium">保存</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between py-2.5 px-4 bg-slate-800/50 rounded-xl">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full ${log.status === 'completed' ? 'bg-violet-500/20 text-violet-300' : 'bg-amber-500/20 text-amber-400'}`}>
            {log.status === 'completed' ? '記録' : 'スキップ'}
          </span>
          <span className="text-slate-400 text-xs">{log.date}</span>
          {log.status === 'completed' && <span className="text-white text-sm font-semibold">+{log.value} {unit}</span>}
        </div>
        {log.note && <p className="text-slate-500 text-xs mt-0.5 truncate">{log.note}</p>}
      </div>
      <div className="flex gap-1 ml-2 shrink-0">
        <button onClick={() => setEditing(true)} className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors">編集</button>
        <button onClick={() => setConfirmDel(true)} className="text-xs text-slate-500 hover:text-red-400 px-2 py-1 transition-colors">削除</button>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────
export default function MainTracker({ habit, onAddLog, onUpdateLog, onDeleteLog, onBack, onDelete, onArchive, onRenewSame, onRenewSetup }) {
  const today = todayStr()
  const yesterday = yesterdayStr()

  const [input, setInput] = useState('')
  const [note, setNote] = useState('')
  const [dateMode, setDateMode] = useState('today')
  const [customDate, setCustomDate] = useState(today)
  const [isSkip, setIsSkip] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [archiveConfirm, setArchiveConfirm] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const recordRef = useRef(null)

  const { type, unit, goalTotal, logs, dailyAmount, weeklyDays } = habit
  const allLogs = [...logs, ...(habit.inheritedLogs || [])]
  const recorded = sumRecorded(logs)
  const remaining = Math.max(goalTotal - recorded, 0)
  const percent = recorded / goalTotal
  const percentDisplay = Math.min(Math.round(percent * 100), 100)
  const isDone = recorded >= goalTotal

  const selectedDate = dateMode === 'today' ? today : dateMode === 'yesterday' ? yesterday : customDate

  function handleSelectDate(date) {
    setCustomDate(date)
    setDateMode('custom')
    setShowCalendar(false)
    setTimeout(() => recordRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function handleRecord() {
    if (isSkip) {
      onAddLog({ date: selectedDate, value: null, status: 'skipped', note })
      setNote('')
    } else {
      const val = Number(input)
      if (!val || val <= 0) return
      onAddLog({ date: selectedDate, value: val, status: 'completed', note })
      setInput('')
      setNote('')
    }
  }

  const isArchived = !!habit.archived

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Delete habit confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-white font-bold text-lg mb-2">習慣を削除しますか？</h2>
            <p className="text-slate-400 text-sm mb-6">「{type}」とすべての記録が削除されます。この操作は取り消せません。</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(false)} className="flex-1 py-3 bg-slate-700 rounded-xl text-white font-medium">キャンセル</button>
              <button onClick={onDelete} className="flex-1 py-3 bg-red-500 rounded-xl text-white font-bold">削除する</button>
            </div>
          </div>
        </div>
      )}

      {/* Archive confirm */}
      {archiveConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-white font-bold text-lg mb-2">アーカイブしますか？</h2>
            <p className="text-slate-400 text-sm mb-6">「{type}」をアーカイブします。記録は保存され、一覧の下部で確認できます。</p>
            <div className="flex gap-3">
              <button onClick={() => setArchiveConfirm(false)} className="flex-1 py-3 bg-slate-700 rounded-xl text-white font-medium">キャンセル</button>
              <button onClick={onArchive} className="flex-1 py-3 bg-slate-500 rounded-xl text-white font-bold">アーカイブ</button>
            </div>
          </div>
        </div>
      )}

      {/* Month calendar */}
      {showCalendar && (
        <MonthCalendar
          logs={allLogs}
          unit={unit}
          dailyAmount={dailyAmount}
          onClose={() => setShowCalendar(false)}
          onSelectDate={isArchived ? () => setShowCalendar(false) : handleSelectDate}
        />
      )}

      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors">
            ← 一覧に戻る
          </button>
          {isArchived ? (
            <div className="flex gap-2">
              <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg">アーカイブ済み</span>
              <button onClick={() => setDeleteConfirm(true)} className="text-xs text-red-500/70 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-800">
                削除
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setArchiveConfirm(true)} className="text-xs text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg bg-slate-800">
                アーカイブ
              </button>
              <button onClick={() => setDeleteConfirm(true)} className="text-xs text-red-500/70 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-800">
                削除
              </button>
            </div>
          )}
        </div>
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Habit Tracker</p>
        <h1 className="text-2xl font-bold text-white mt-1">{type}</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {periodLabel(habit)} · 週{weeklyDays}日 · {dailyAmount}{unit}/日
        </p>
      </div>

      {/* Circle */}
      <div className="flex flex-col items-center py-4">
        <div className="relative">
          <CircleProgress percent={percent} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isDone ? (
              <><span className="text-4xl">🎉</span><span className="text-green-400 font-bold text-sm mt-1">達成！</span></>
            ) : (
              <><span className="text-slate-400 text-xs mb-1">残り</span>
                <span className="text-4xl font-black text-white leading-none">{remaining.toLocaleString()}</span>
                <span className="text-slate-300 text-sm mt-1">{unit}</span></>
            )}
          </div>
        </div>
        <div className="flex gap-6 mt-2 text-center">
          <div><p className="text-xs text-slate-500">達成</p><p className="text-white font-bold">{recorded.toLocaleString()}<span className="text-slate-400 text-xs ml-1">{unit}</span></p></div>
          <div className="w-px bg-slate-800" />
          <div><p className="text-xs text-slate-500">目標</p><p className="text-white font-bold">{goalTotal.toLocaleString()}<span className="text-slate-400 text-xs ml-1">{unit}</span></p></div>
          <div className="w-px bg-slate-800" />
          <div><p className="text-xs text-slate-500">進捗</p><p className="text-violet-400 font-bold">{percentDisplay}%</p></div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-5">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-700 ease-out" style={{ width: `${percentDisplay}%` }} />
        </div>
      </div>

      {/* 7-day chart */}
      <div className="px-5 mb-5">
        <WeekChart logs={allLogs} unit={unit} dailyAmount={dailyAmount} onOpenCalendar={() => setShowCalendar(true)} />
      </div>

      {/* Achievement CTA — shown when goal is met and habit is still active */}
      {isDone && !isArchived && (
        <div className="px-5 mb-5">
          <div className="bg-gradient-to-br from-green-500/15 to-emerald-500/10 border border-green-500/30 rounded-2xl p-5">
            <p className="text-green-400 font-bold text-base mb-1">🎉 目標達成！</p>
            <p className="text-slate-400 text-sm mb-4">記録を保存してアーカイブするか、新しい期間を始めましょう。</p>
            <div className="flex gap-2 mb-2">
              <button onClick={onRenewSame}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white text-sm font-bold shadow-lg shadow-green-500/25 active:scale-95 transition-transform">
                同じ設定で再開
              </button>
              <button onClick={onRenewSetup}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white text-sm font-medium transition-colors">
                設定を変更して再開
              </button>
            </div>
            <button onClick={() => setArchiveConfirm(true)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 text-sm transition-colors">
              アーカイブのみ
            </button>
          </div>
        </div>
      )}

      {/* Archived banner */}
      {isArchived && (
        <div className="px-5 mb-5">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-3 text-center">この習慣はアーカイブされています。</p>
            <div className="flex gap-2">
              <button onClick={onRenewSame}
                className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl text-white text-sm font-bold shadow-lg shadow-violet-500/25 active:scale-95 transition-transform">
                同じ設定で再開
              </button>
              <button onClick={onRenewSetup}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white text-sm font-medium transition-colors">
                設定を変更して再開
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record input — hidden for archived habits */}
      {!isArchived && <div className="px-5 mb-5" ref={recordRef}>
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-3">
          <p className="text-sm text-slate-400 font-medium">記録を追加</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[{ id: 'today', label: '今日' }, { id: 'yesterday', label: '昨日' }, { id: 'custom', label: '日付選択' }].map(opt => (
              <button key={opt.id} type="button" onClick={() => setDateMode(opt.id)}
                className={`py-2 rounded-xl text-xs font-medium transition-all ${dateMode === opt.id ? 'bg-violet-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                {opt.label}
              </button>
            ))}
          </div>
          {dateMode === 'custom' && (
            <input type="date" value={customDate} max={today} onChange={e => setCustomDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 [color-scheme:dark]" />
          )}
          <div className="grid grid-cols-2 gap-1.5">
            <button type="button" onClick={() => setIsSkip(false)}
              className={`py-2 rounded-xl text-xs font-medium transition-all ${!isSkip ? 'bg-violet-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
              記録
            </button>
            <button type="button" onClick={() => setIsSkip(true)}
              className={`py-2 rounded-xl text-xs font-medium transition-all ${isSkip ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
              スキップ
            </button>
          </div>
          {!isSkip ? (
            <>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
                <input type="number" min="0.1" step="any" placeholder="0" value={input}
                  onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRecord()}
                  className="flex-1 min-w-0 bg-transparent text-white text-lg font-semibold placeholder-slate-600 focus:outline-none" />
                <span className="text-slate-400 text-sm whitespace-nowrap">{unit}</span>
              </div>
              <div className="flex gap-1.5">
                {[dailyAmount * 0.5, dailyAmount, dailyAmount * 2].map((v, i) => {
                  const val = Math.round(v * 10) / 10
                  return (
                    <button key={i} type="button" onClick={() => setInput(String(val))}
                      className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors">
                      {val}{unit}
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <input type="text" placeholder="理由（任意）: 休養、体調不良、出張…" value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 placeholder-slate-600" />
          )}
          {!isSkip && (
            <input type="text" placeholder="メモ（任意）" value={note} onChange={e => setNote(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-600" />
          )}
          <button onClick={handleRecord}
            disabled={!isSkip && (!input || Number(input) <= 0)}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-lg ${isSkip ? 'bg-amber-500 hover:bg-amber-400 shadow-amber-500/20' : 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 shadow-violet-500/20'}`}>
            {isSkip ? 'スキップとして記録' : '記録する'}
          </button>
        </div>
      </div>}

      {/* Log history */}
      {allLogs.length > 0 && (
        <div className="px-5 pb-10">
          <button onClick={() => setShowLogs(v => !v)}
            className="w-full flex items-center justify-between py-3 text-sm text-slate-400 hover:text-slate-200 transition-colors">
            <span>記録履歴 ({allLogs.length}件)</span>
            <span className={`transition-transform text-xs ${showLogs ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showLogs && (
            <div className="space-y-2 mt-1">
              {[...allLogs].sort((a, b) => b.date > a.date ? 1 : b.date < a.date ? -1 : b.createdAt - a.createdAt).map(log => {
                const isInherited = !(logs.find(l => l.id === log.id))
                return isInherited ? (
                  <div key={log.id} className="flex items-center justify-between py-2.5 px-4 bg-slate-800/30 rounded-xl opacity-60">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${log.status === 'completed' ? 'bg-violet-500/15 text-violet-400' : 'bg-amber-500/15 text-amber-500'}`}>
                          {log.status === 'completed' ? '記録' : 'スキップ'}
                        </span>
                        <span className="text-slate-500 text-xs">{log.date}</span>
                        {log.status === 'completed' && <span className="text-slate-400 text-sm font-semibold">+{log.value} {unit}</span>}
                        <span className="text-xs text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">過去の記録</span>
                      </div>
                      {log.note && <p className="text-slate-600 text-xs mt-0.5 truncate">{log.note}</p>}
                    </div>
                  </div>
                ) : (
                  <LogItem key={log.id} log={log} unit={unit}
                    onUpdate={updates => onUpdateLog(log.id, updates)}
                    onDelete={() => onDeleteLog(log.id)} />
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

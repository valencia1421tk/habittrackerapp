import { useState } from 'react'

function CircleProgress({ percent }) {
  const r = 80
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.min(percent, 1))

  return (
    <svg width="200" height="200" className="rotate-[-90deg]">
      <circle cx="100" cy="100" r={r} fill="none" stroke="#1e1b4b" strokeWidth="16" />
      <circle
        cx="100" cy="100" r={r}
        fill="none"
        stroke="url(#grad)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function MainTracker({ habit, onRecord, onBack, onDelete }) {
  const [input, setInput] = useState('')
  const [showLogs, setShowLogs] = useState(false)

  const { type, unit, goalTotal, recorded, logs, dailyAmount, weeklyDays, period } = habit
  const remaining = Math.max(goalTotal - recorded, 0)
  const percent = recorded / goalTotal
  const percentDisplay = Math.min(Math.round(percent * 100), 100)
  const isDone = recorded >= goalTotal

  function handleRecord() {
    const val = Number(input)
    if (!val || val <= 0) return
    onRecord(val)
    setInput('')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors">
            <span>←</span> 一覧に戻る
          </button>
          <button
            onClick={onDelete}
            className="text-xs text-red-500/70 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-800"
          >
            削除
          </button>
        </div>
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Habit Tracker</p>
        <h1 className="text-2xl font-bold text-white mt-1">{type}</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {period === 'week' ? '1週間' : '1ヶ月'} · 週{weeklyDays}日 · {dailyAmount}{unit}/日
        </p>
      </div>

      {/* Circle + Remaining */}
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <CircleProgress percent={percent} />
          <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
            {isDone ? (
              <>
                <span className="text-4xl">🎉</span>
                <span className="text-green-400 font-bold text-sm mt-1">達成！</span>
              </>
            ) : (
              <>
                <span className="text-slate-400 text-xs mb-1">残り</span>
                <span className="text-4xl font-black text-white leading-none">{remaining.toLocaleString()}</span>
                <span className="text-slate-300 text-sm mt-1">{unit}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-6 mt-2 text-center">
          <div>
            <p className="text-xs text-slate-500">達成</p>
            <p className="text-white font-bold">{recorded.toLocaleString()}<span className="text-slate-400 text-xs ml-1">{unit}</span></p>
          </div>
          <div className="w-px bg-slate-800" />
          <div>
            <p className="text-xs text-slate-500">目標</p>
            <p className="text-white font-bold">{goalTotal.toLocaleString()}<span className="text-slate-400 text-xs ml-1">{unit}</span></p>
          </div>
          <div className="w-px bg-slate-800" />
          <div>
            <p className="text-xs text-slate-500">進捗</p>
            <p className="text-violet-400 font-bold">{percentDisplay}%</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 mb-6">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentDisplay}%` }}
          />
        </div>
      </div>

      {/* Input */}
      {!isDone && (
        <div className="px-5 mb-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
            <p className="text-sm text-slate-400 mb-3">今日の記録を追加</p>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 mb-3">
              <input
                type="number"
                min="0.1"
                step="any"
                placeholder="0"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRecord()}
                className="flex-1 min-w-0 bg-transparent text-white text-lg font-semibold placeholder-slate-600 focus:outline-none"
              />
              <span className="text-slate-400 text-sm whitespace-nowrap">{unit}</span>
            </div>
            <button
              onClick={handleRecord}
              disabled={!input || Number(input) <= 0}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-violet-500/20"
            >
              記録する
            </button>

            {/* Quick add buttons */}
            <div className="flex gap-2 mt-3">
              {[dailyAmount * 0.5, dailyAmount, dailyAmount * 2].map((v, i) => {
                const val = Math.round(v * 10) / 10
                const labels = ['×0.5', '×1', '×2']
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInput(String(val))}
                    className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors"
                  >
                    {val} {unit}
                    <span className="block text-slate-500 text-xs">{labels[i]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Logs */}
      {logs.length > 0 && (
        <div className="px-5 pb-8">
          <button
            onClick={() => setShowLogs(v => !v)}
            className="w-full flex items-center justify-between py-3 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>記録履歴 ({logs.length}件)</span>
            <span className={`transition-transform ${showLogs ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {showLogs && (
            <div className="space-y-2 mt-1">
              {logs.map((log, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 px-4 bg-slate-800/50 rounded-xl">
                  <span className="text-slate-400 text-sm">{log.date}</span>
                  <span className="text-white font-semibold">+{log.amount} {unit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

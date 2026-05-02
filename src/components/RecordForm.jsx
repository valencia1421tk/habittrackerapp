import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

const pad = n => String(n).padStart(2, '0')
const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
const todayStr = () => toDateStr(new Date())
const yesterdayStr = () => toDateStr(new Date(Date.now() - 86400000))

export default function RecordForm({ habit, onRecord }) {
  const { t } = useLang()
  const today = todayStr()
  const yesterday = yesterdayStr()

  const [input, setInput] = useState('')
  const [note, setNote] = useState('')
  const [dateMode, setDateMode] = useState('today')
  const [customDate, setCustomDate] = useState(today)
  const [isRest, setIsRest] = useState(false)

  const { unit, dailyAmount } = habit
  const selectedDate = dateMode === 'today' ? today : dateMode === 'yesterday' ? yesterday : customDate

  function handleRecord() {
    if (isRest) {
      onRecord({ date: selectedDate, value: null, status: 'skipped', note })
      setNote('')
      setIsRest(false)
    } else {
      const val = Number(input)
      if (!val || val <= 0) return
      onRecord({ date: selectedDate, value: val, status: 'completed', note })
      setInput('')
      setNote('')
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { id: 'today', label: t.date_today },
          { id: 'yesterday', label: t.date_yesterday },
          { id: 'custom', label: t.date_custom },
        ].map(opt => (
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
        <button type="button" onClick={() => setIsRest(false)}
          className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${!isRest ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'bg-slate-700/60 text-slate-400 border border-slate-700'}`}>
          {t.mode_record}
        </button>
        <button type="button" onClick={() => setIsRest(true)}
          className={`py-2.5 rounded-xl text-sm font-medium transition-all ${isRest ? 'bg-slate-600 text-white' : 'bg-slate-800/60 text-slate-500 border border-slate-700/50'}`}>
          {t.mode_rest}
        </button>
      </div>

      {!isRest ? (
        <>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
            <input
              type="number" min="0.1" step="any"
              placeholder={t.record_input_placeholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleRecord()}
              className="flex-1 min-w-0 bg-transparent text-white text-lg font-semibold placeholder-slate-600 focus:outline-none"
            />
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
          <input type="text" placeholder={t.note_placeholder} value={note} onChange={e => setNote(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-600" />
        </>
      ) : (
        <input type="text" placeholder={t.skip_reason_placeholder} value={note} onChange={e => setNote(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 placeholder-slate-600" />
      )}

      <button
        onClick={handleRecord}
        disabled={!isRest && (!input || Number(input) <= 0)}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-lg ${isRest ? 'bg-slate-600 hover:bg-slate-500 shadow-slate-600/20' : 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 shadow-violet-500/20'}`}>
        {isRest ? t.btn_rest_record : t.btn_record}
      </button>
    </div>
  )
}

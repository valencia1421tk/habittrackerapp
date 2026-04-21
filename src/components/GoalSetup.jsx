import { useState } from 'react'

const PRESETS = [
  { label: '筋トレ', unit: '回' },
  { label: 'ランニング', unit: 'km' },
  { label: '単語暗記', unit: '個' },
  { label: '読書', unit: 'ページ' },
  { label: '瞑想', unit: '分' },
]

export default function GoalSetup({ onSubmit, onBack }) {
  const [type, setType] = useState('')
  const [unit, setUnit] = useState('')
  const [period, setPeriod] = useState('week')
  const [customDays, setCustomDays] = useState('')
  const [dailyAmount, setDailyAmount] = useState('')
  const [weeklyDays, setWeeklyDays] = useState('5')
  const [customType, setCustomType] = useState(false)

  function handlePreset(preset) {
    setType(preset.label)
    setUnit(preset.unit)
    setCustomType(false)
  }

  const periodDays = period === 'week' ? 7 : period === 'month' ? 30 : Number(customDays || 0)
  const weeks = periodDays / 7
  const totalDays = Math.round(weeks * Number(weeklyDays || 0))
  const rawTotal = totalDays * Number(dailyAmount || 0)
  const goalTotal = Math.ceil(rawTotal * 1.15)

  const canSubmit = type && unit && dailyAmount && weeklyDays && (period !== 'custom' || customDays)

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ type, unit, period, dailyAmount: Number(dailyAmount), weeklyDays: Number(weeklyDays) })
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="px-5 pt-12 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
          <span>←</span> 戻る
        </button>
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Habit Tracker</p>
        <h1 className="text-2xl font-bold text-white mt-1">目標を設定する</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-5 pb-8 space-y-6">

        {/* 種類 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">習慣の種類</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESETS.map(p => (
              <button
                key={p.label}
                type="button"
                onClick={() => handlePreset(p)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  type === p.label && !customType
                    ? 'bg-violet-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setCustomType(true); setType(''); setUnit('') }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                customType ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              カスタム
            </button>
          </div>

          {customType && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="例：腕立て伏せ"
                value={type}
                onChange={e => setType(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <input
                type="text"
                placeholder="単位"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-24 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          )}

          {!customType && type && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-violet-400 text-sm">単位：</span>
              <input
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-24 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          )}
        </div>

        {/* 期間 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">期間</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'week', label: '1週間', sub: '7日間' },
              { value: 'month', label: '1ヶ月', sub: '30日間' },
              { value: 'custom', label: '期間を設定', sub: '日数を入力' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPeriod(opt.value)}
                className={`p-3 rounded-2xl border-2 transition-all text-left ${
                  period === opt.value
                    ? 'border-violet-500 bg-violet-500/10'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                <div className="font-semibold text-white text-sm">{opt.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{opt.sub}</div>
              </button>
            ))}
          </div>
          {period === 'custom' && (
            <div className="flex items-center gap-2 mt-3 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
              <input
                type="number"
                min="1"
                placeholder="例：60"
                value={customDays}
                onChange={e => setCustomDays(e.target.value)}
                className="flex-1 bg-transparent text-white text-base font-semibold placeholder-slate-500 focus:outline-none"
              />
              <span className="text-slate-400 text-sm whitespace-nowrap">日間</span>
            </div>
          )}
        </div>

        {/* 1日の量 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">1日の目安量</label>
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
            <input
              type="number"
              min="1"
              placeholder="0"
              value={dailyAmount}
              onChange={e => setDailyAmount(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-white text-base font-semibold placeholder-slate-500 focus:outline-none"
            />
            <span className="text-slate-400 text-sm whitespace-nowrap">{unit || '単位'} / 日</span>
          </div>
        </div>

        {/* 週の頻度 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">週の頻度</label>
          <div className="flex gap-2 justify-between">
            {[1,2,3,4,5,6,7].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setWeeklyDays(String(d))}
                className={`flex-1 aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  Number(weeklyDays) === d
                    ? 'bg-violet-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">週 {weeklyDays} 日</p>
        </div>

        {/* 計算プレビュー */}
        {canSubmit && (
          <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-violet-700/40 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-medium text-violet-300 uppercase tracking-widest">自動計算結果</p>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">実施日数</span>
              <span className="text-white font-medium">{totalDays} 日</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">必要量 (×1.15)</span>
              <span className="text-slate-300">{rawTotal} → {goalTotal} {unit}</span>
            </div>
            <div className="border-t border-violet-700/40 pt-2 flex justify-between">
              <span className="text-white font-semibold">目標値</span>
              <span className="text-violet-300 font-bold text-lg">{goalTotal} {unit}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 active:scale-95 text-white shadow-lg shadow-violet-500/25"
        >
          目標を開始する
        </button>
      </form>
    </div>
  )
}

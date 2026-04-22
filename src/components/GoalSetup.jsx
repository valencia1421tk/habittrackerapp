import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

export default function GoalSetup({ onSubmit, onBack, initialValues, submitLabel }) {
  const { t } = useLang()
  const iv = initialValues || {}
  const isPreset = t.presets.some(p => p.label === iv.type)

  const [type, setType] = useState(iv.type || '')
  const [unit, setUnit] = useState(iv.unit || '')
  const [period, setPeriod] = useState(iv.period || 'week')
  const [customDays, setCustomDays] = useState(iv.customDays ? String(iv.customDays) : '')
  const [dailyAmount, setDailyAmount] = useState(iv.dailyAmount ? String(iv.dailyAmount) : '')
  const [weeklyDays, setWeeklyDays] = useState(iv.weeklyDays ? String(iv.weeklyDays) : '5')
  const [customType, setCustomType] = useState(!!iv.type && !isPreset)

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
    onSubmit({ type, unit, period, customDays: Number(customDays) || 0, dailyAmount: Number(dailyAmount), weeklyDays: Number(weeklyDays) })
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="px-5 pt-12 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
          {t.setup_back}
        </button>
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Habit Tracker</p>
        <h1 className="text-2xl font-bold text-white mt-1">{t.setup_title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-5 pb-8 space-y-6">

        {/* 種類 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">{t.setup_type_label}</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {t.presets.map(p => (
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
              {t.setup_custom_btn}
            </button>
          </div>

          {customType && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.setup_custom_placeholder}
                value={type}
                onChange={e => setType(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <input
                type="text"
                placeholder={t.setup_unit_placeholder}
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-24 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          )}

          {!customType && type && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-violet-400 text-sm">{t.setup_unit_label}</span>
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
          <label className="block text-sm font-medium text-slate-300 mb-3">{t.setup_period_label}</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'week', label: t.setup_period_week, sub: t.setup_period_week_sub },
              { value: 'month', label: t.setup_period_month, sub: t.setup_period_month_sub },
              { value: 'custom', label: t.setup_period_custom, sub: t.setup_period_custom_sub },
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
                placeholder={t.setup_days_placeholder}
                value={customDays}
                onChange={e => setCustomDays(e.target.value)}
                className="flex-1 bg-transparent text-white text-base font-semibold placeholder-slate-500 focus:outline-none"
              />
              <span className="text-slate-400 text-sm whitespace-nowrap">{t.setup_days_unit}</span>
            </div>
          )}
        </div>

        {/* 1日の量 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">{t.setup_daily_label}</label>
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
            <input
              type="number"
              min="1"
              placeholder="0"
              value={dailyAmount}
              onChange={e => setDailyAmount(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-white text-base font-semibold placeholder-slate-500 focus:outline-none"
            />
            <span className="text-slate-400 text-sm whitespace-nowrap">{unit || t.setup_unit_placeholder} / {t.setup_days_unit === '日間' ? '日' : 'day'}</span>
          </div>
        </div>

        {/* 週の頻度 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">{t.setup_weekly_label}</label>
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
          <p className="text-xs text-slate-500 mt-2 text-center">{t.setup_weekly_display(weeklyDays)}</p>
        </div>

        {/* プレビュー */}
        {canSubmit && (
          <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-violet-700/40 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-medium text-violet-300 uppercase tracking-widest">{t.setup_preview_title}</p>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">{t.setup_preview_days}</span>
              <span className="text-white font-medium">{totalDays} {t.setup_preview_days_unit}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">{t.setup_preview_required}</span>
              <span className="text-slate-300">{rawTotal} → {goalTotal} {unit}</span>
            </div>
            <div className="border-t border-violet-700/40 pt-2 flex justify-between">
              <span className="text-white font-semibold">{t.setup_preview_goal}</span>
              <span className="text-violet-300 font-bold text-lg">{goalTotal} {unit}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 active:scale-95 text-white shadow-lg shadow-violet-500/25"
        >
          {submitLabel || t.setup_submit}
        </button>
      </form>
    </div>
  )
}

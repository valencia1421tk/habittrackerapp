import { useState, useEffect } from 'react'

const STORAGE_KEY = 'habit-tracker-data'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useHabit() {
  const [habit, setHabit] = useState(() => loadData())

  useEffect(() => {
    if (habit) saveData(habit)
  }, [habit])

  function createHabit({ type, unit, period, dailyAmount, weeklyDays }) {
    const periodDays = period === 'week' ? 7 : 30
    const weeks = period === 'week' ? 1 : 4.285
    const totalDays = Math.round(weeks * weeklyDays)
    const rawTotal = totalDays * dailyAmount
    const goalTotal = Math.ceil(rawTotal * 1.15)

    setHabit({
      type,
      unit,
      period,
      dailyAmount: Number(dailyAmount),
      weeklyDays: Number(weeklyDays),
      goalTotal,
      recorded: 0,
      logs: [],
      createdAt: Date.now(),
      periodDays,
    })
  }

  function recordProgress(amount) {
    setHabit(prev => {
      if (!prev) return prev
      const added = Number(amount)
      return {
        ...prev,
        recorded: prev.recorded + added,
        logs: [
          { amount: added, date: new Date().toLocaleString('ja-JP') },
          ...prev.logs,
        ],
      }
    })
  }

  function resetHabit() {
    localStorage.removeItem(STORAGE_KEY)
    setHabit(null)
  }

  return { habit, createHabit, recordProgress, resetHabit }
}

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'habit-tracker-v2'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function calcGoal({ dailyAmount, weeklyDays, period }) {
  const weeks = period === 'week' ? 1 : 4.285
  const totalDays = Math.round(weeks * weeklyDays)
  const rawTotal = totalDays * dailyAmount
  return Math.ceil(rawTotal * 1.15)
}

export function useHabits() {
  const [habits, setHabits] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  function addHabit({ type, unit, period, dailyAmount, weeklyDays }) {
    const goalTotal = calcGoal({ dailyAmount, weeklyDays, period })
    const habit = {
      id: Date.now().toString(),
      type,
      unit,
      period,
      dailyAmount: Number(dailyAmount),
      weeklyDays: Number(weeklyDays),
      goalTotal,
      recorded: 0,
      logs: [],
      createdAt: Date.now(),
    }
    setHabits(prev => [...prev, habit])
    return habit.id
  }

  function recordProgress(id, amount) {
    setHabits(prev => prev.map(h =>
      h.id !== id ? h : {
        ...h,
        recorded: h.recorded + Number(amount),
        logs: [
          { amount: Number(amount), date: new Date().toLocaleString('ja-JP') },
          ...h.logs,
        ],
      }
    ))
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  return { habits, addHabit, recordProgress, deleteHabit }
}

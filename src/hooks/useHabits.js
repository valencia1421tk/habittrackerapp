import { useState, useEffect } from 'react'

const STORAGE_KEY = 'habit-tracker-v3'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function calcGoal({ dailyAmount, weeklyDays, periodDays }) {
  const weeks = periodDays / 7
  const totalDays = Math.round(weeks * weeklyDays)
  return Math.ceil(totalDays * dailyAmount * 1.15)
}

export function sumRecorded(logs) {
  return logs.reduce((sum, l) => l.status === 'completed' ? sum + (l.value || 0) : sum, 0)
}

export function useHabits() {
  const [habits, setHabits] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  function addHabit({ type, unit, period, customDays, dailyAmount, weeklyDays }) {
    const periodDays = period === 'week' ? 7 : period === 'month' ? 30 : Number(customDays || 0)
    const goalTotal = calcGoal({ dailyAmount: Number(dailyAmount), weeklyDays: Number(weeklyDays), periodDays })
    const habit = {
      id: Date.now().toString(),
      type, unit, period, periodDays,
      dailyAmount: Number(dailyAmount),
      weeklyDays: Number(weeklyDays),
      goalTotal,
      logs: [],
      createdAt: Date.now(),
    }
    setHabits(prev => [...prev, habit])
    return habit.id
  }

  function addLog(habitId, { date, value, status, note }) {
    const log = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      date,
      value: status === 'completed' ? Number(value) : null,
      status,
      note: note || '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setHabits(prev => prev.map(h =>
      h.id !== habitId ? h : { ...h, logs: [log, ...h.logs] }
    ))
  }

  function updateLog(habitId, logId, { value, status, note }) {
    setHabits(prev => prev.map(h =>
      h.id !== habitId ? h : {
        ...h,
        logs: h.logs.map(l =>
          l.id !== logId ? l : {
            ...l,
            value: status === 'completed' ? Number(value) : null,
            status,
            note: note || '',
            updatedAt: Date.now(),
          }
        ),
      }
    ))
  }

  function deleteLog(habitId, logId) {
    setHabits(prev => prev.map(h =>
      h.id !== habitId ? h : { ...h, logs: h.logs.filter(l => l.id !== logId) }
    ))
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  return { habits, addHabit, addLog, updateLog, deleteLog, deleteHabit }
}

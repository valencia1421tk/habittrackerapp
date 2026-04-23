import { useState } from 'react'
import { useHabits } from './hooks/useHabits'
import HabitList from './components/HabitList'
import GoalSetup from './components/GoalSetup'
import MainTracker from './components/MainTracker'

export default function App() {
  const { habits, addHabit, addLog, updateLog, deleteLog, deleteHabit, archiveHabit, renewHabit, renewHabitWithSettings } = useHabits()
  const [view, setView] = useState('list')
  const [selectedId, setSelectedId] = useState(null)
  const [renewingFromId, setRenewingFromId] = useState(null)

  const selectedHabit = habits.find(h => h.id === selectedId) ?? null
  const renewingHabit = habits.find(h => h.id === renewingFromId) ?? null

  function handleAdd(formData) {
    const id = addHabit(formData)
    setSelectedId(id)
    setView('tracker')
  }

  function handleSelect(id) {
    setSelectedId(id)
    setView('tracker')
  }

  function handleDelete(id) {
    deleteHabit(id)
    setView('list')
    setSelectedId(null)
  }

  function handleRenewSame(id) {
    renewHabit(id)
    setView('list')
    setSelectedId(null)
  }

  function handleRenewSetup(id) {
    setRenewingFromId(id)
    setView('renew-setup')
  }

  function handleRenewWithSettings(formData) {
    renewHabitWithSettings(renewingFromId, formData)
    setRenewingFromId(null)
    setView('list')
    setSelectedId(null)
  }

  if (view === 'setup') {
    return <GoalSetup onSubmit={handleAdd} onBack={() => setView('list')} />
  }

  if (view === 'renew-setup' && renewingHabit) {
    return (
      <GoalSetup
        onSubmit={handleRenewWithSettings}
        onBack={() => { setRenewingFromId(null); setView('tracker') }}
        initialValues={{
          type: renewingHabit.type,
          unit: renewingHabit.unit,
          period: renewingHabit.period,
          customDays: renewingHabit.period === 'custom' ? renewingHabit.periodDays : '',
          dailyAmount: renewingHabit.dailyAmount,
          weeklyDays: renewingHabit.weeklyDays,
          noBuffer: renewingHabit.noBuffer,
        }}
        submitLabel="この設定で再開する"
      />
    )
  }

  if (view === 'tracker' && selectedHabit) {
    return (
      <MainTracker
        habit={selectedHabit}
        onAddLog={entry => addLog(selectedId, entry)}
        onUpdateLog={(logId, updates) => updateLog(selectedId, logId, updates)}
        onDeleteLog={logId => deleteLog(selectedId, logId)}
        onBack={() => setView('list')}
        onDelete={() => handleDelete(selectedId)}
        onArchive={() => { archiveHabit(selectedId); setView('list') }}
        onRenewSame={() => handleRenewSame(selectedId)}
        onRenewSetup={() => handleRenewSetup(selectedId)}
      />
    )
  }

  return <HabitList habits={habits} onSelect={handleSelect} onAdd={() => setView('setup')} />
}

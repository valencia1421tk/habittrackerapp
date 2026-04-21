import { useState } from 'react'
import { useHabits } from './hooks/useHabits'
import HabitList from './components/HabitList'
import GoalSetup from './components/GoalSetup'
import MainTracker from './components/MainTracker'

export default function App() {
  const { habits, addHabit, addLog, updateLog, deleteLog, deleteHabit } = useHabits()
  const [view, setView] = useState('list')
  const [selectedId, setSelectedId] = useState(null)

  const selectedHabit = habits.find(h => h.id === selectedId) ?? null

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

  if (view === 'setup') {
    return <GoalSetup onSubmit={handleAdd} onBack={() => setView('list')} />
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
      />
    )
  }

  return <HabitList habits={habits} onSelect={handleSelect} onAdd={() => setView('setup')} />
}

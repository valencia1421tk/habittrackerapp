export default function HabitList({ habits, onSelect, onAdd }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="px-5 pt-12 pb-6 flex items-end justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Habit Tracker</p>
          <h1 className="text-2xl font-bold text-white mt-1">マイ習慣</h1>
        </div>
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-violet-500/30 active:scale-95 transition-transform"
        >
          +
        </button>
      </div>

      <div className="flex-1 px-5 pb-8">
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <p className="text-slate-300 font-semibold">習慣がまだありません</p>
            <p className="text-slate-500 text-sm mt-1">右上の + で追加しましょう</p>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map(habit => {
              const pct = Math.min(Math.round((habit.recorded / habit.goalTotal) * 100), 100)
              const isDone = habit.recorded >= habit.goalTotal
              return (
                <button
                  key={habit.id}
                  onClick={() => onSelect(habit.id)}
                  className="w-full text-left bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold text-base">{habit.type}</p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {habit.period === 'week' ? '1週間' : '1ヶ月'} · 週{habit.weeklyDays}日 · {habit.dailyAmount}{habit.unit}/日
                      </p>
                    </div>
                    {isDone ? (
                      <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2.5 py-1 font-medium">達成</span>
                    ) : (
                      <span className="text-xs text-violet-300 font-bold">{pct}%</span>
                    )}
                  </div>

                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-green-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-slate-500">{habit.recorded.toLocaleString()} {habit.unit} 達成</span>
                    <span className="text-xs text-slate-500">目標 {habit.goalTotal.toLocaleString()} {habit.unit}</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

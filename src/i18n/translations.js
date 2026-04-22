export const LANGUAGES = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
]

export const translations = {
  ja: {
    // Greetings
    greeting_morning: 'おはようございます',
    greeting_afternoon: 'こんにちは',
    greeting_evening: 'こんばんは',

    // Quote widget
    quote_add: '＋ 名言を追加',
    quote_placeholder: '名言・座右の銘を入力…',
    quote_save: '保存',

    // HabitList
    page_title: '進行中の習慣',
    stat_count: '習慣数',
    stat_count_unit: '個',
    stat_avg: '平均達成率',
    stat_done: '達成済み',
    stat_done_unit: '個',
    empty_title: '習慣を追加しよう',
    empty_desc: '＋ ボタンから目標を設定できます',
    empty_btn: '最初の習慣を追加',
    no_active: 'アクティブな習慣がありません',
    add_new: '新しい習慣を追加',
    badge_done: '達成',
    badge_archived: 'アーカイブ',
    label_achieved: '達成',
    label_remaining: '残り',
    archive_section: (n) => `アーカイブ済み (${n}件)`,

    // Period / frequency labels
    period_week: '1週間',
    period_month: '1ヶ月',
    period_custom: (n) => `${n}日間`,
    weekly_days: (n) => `週${n}日`,
    per_day: (n, unit) => `${n}${unit}/日`,

    // MainTracker header
    back: '← 一覧に戻る',
    archived_badge: 'アーカイブ済み',
    btn_archive: 'アーカイブ',
    btn_delete: '削除',

    // Delete confirm
    delete_title: '習慣を削除しますか？',
    delete_desc: (type) => `「${type}」とすべての記録が削除されます。この操作は取り消せません。`,
    btn_cancel: 'キャンセル',
    btn_delete_confirm: '削除する',

    // Archive confirm
    archive_confirm_title: 'アーカイブしますか？',
    archive_confirm_desc: (type) => `「${type}」をアーカイブします。記録は保存され、一覧の下部で確認できます。`,
    btn_archive_confirm: 'アーカイブ',

    // Circle stats
    stat_remaining: '残り',
    stat_achieved2: '達成',
    stat_goal: '目標',
    stat_progress: '進捗',
    stat_done_label: '達成！',

    // WeekChart
    chart_week: '直近7日',
    chart_calendar_btn: '月カレンダー',
    chart_record_legend: '記録',
    chart_skip_legend: 'スキップ',
    chart_locale: 'ja-JP',

    // Calendar
    cal_close: '閉じる',
    cal_legend_done: '目標達成',
    cal_legend_partial: '部分達成',
    cal_legend_skip: 'スキップ',
    cal_weekdays: ['月', '火', '水', '木', '金', '土', '日'],
    cal_title: (y, m) => `${y}年${m}月`,

    // Achievement CTA
    cta_title: '🎉 目標達成！',
    cta_desc: '記録を保存してアーカイブするか、新しい期間を始めましょう。',
    btn_renew_same: '同じ設定で再開',
    btn_renew_setup: '設定を変更して再開',
    btn_archive_only: 'アーカイブのみ',

    // Archived banner
    archived_desc: 'この習慣はアーカイブされています。',

    // Record input
    record_title: '記録を追加',
    date_today: '今日',
    date_yesterday: '昨日',
    date_custom: '日付選択',
    mode_record: '記録',
    mode_skip: 'スキップ',
    skip_reason_placeholder: '理由（任意）: 休養、体調不良、出張…',
    note_placeholder: 'メモ（任意）',
    btn_record: '記録する',
    btn_skip_record: 'スキップとして記録',

    // Log history
    log_history: (n) => `記録履歴 (${n}件)`,
    log_record: '記録',
    log_skip: 'スキップ',
    log_inherited: '過去の記録',
    log_edit: '編集',
    log_delete: '削除',
    log_delete_confirm: '本当に削除しますか？',
    log_cancel: '取消',
    edit_save: '保存',
    edit_cancel: '取消',

    // GoalSetup
    setup_back: '← 戻る',
    setup_title: '目標を設定する',
    setup_type_label: '習慣の種類',
    setup_custom_btn: 'カスタム',
    setup_custom_placeholder: '例：腕立て伏せ',
    setup_unit_placeholder: '単位',
    setup_unit_label: '単位：',
    setup_period_label: '期間',
    setup_period_week: '1週間',
    setup_period_week_sub: '7日間',
    setup_period_month: '1ヶ月',
    setup_period_month_sub: '30日間',
    setup_period_custom: '期間を設定',
    setup_period_custom_sub: '日数を入力',
    setup_days_placeholder: '例：60',
    setup_days_unit: '日間',
    setup_daily_label: '1日の目安量',
    setup_weekly_label: '週の頻度',
    setup_weekly_display: (n) => `週 ${n} 日`,
    setup_preview_title: '自動計算結果',
    setup_preview_days: '実施日数',
    setup_preview_days_unit: '日',
    setup_preview_required: '必要量 (×1.15)',
    setup_preview_goal: '目標値',
    setup_submit: '目標を開始する',
    setup_renew_submit: 'この設定で再開する',

    // Presets (label shown on button; also stored as habit.type)
    presets: [
      { label: '筋トレ', unit: '回' },
      { label: 'ランニング', unit: 'km' },
      { label: '単語暗記', unit: '個' },
      { label: '読書', unit: 'ページ' },
      { label: '瞑想', unit: '分' },
    ],
  },

  en: {
    // Greetings
    greeting_morning: 'Good morning',
    greeting_afternoon: 'Good afternoon',
    greeting_evening: 'Good evening',

    // Quote widget
    quote_add: '+ Add a quote',
    quote_placeholder: 'Enter a motto or favorite quote…',
    quote_save: 'Save',

    // HabitList
    page_title: 'Active Habits',
    stat_count: 'Habits',
    stat_count_unit: '',
    stat_avg: 'Avg. Progress',
    stat_done: 'Completed',
    stat_done_unit: '',
    empty_title: 'Add your first habit',
    empty_desc: 'Tap + to set a goal',
    empty_btn: 'Add first habit',
    no_active: 'No active habits',
    add_new: 'Add new habit',
    badge_done: 'Done',
    badge_archived: 'Archived',
    label_achieved: 'done',
    label_remaining: 'left',
    archive_section: (n) => `Archived (${n})`,

    // Period / frequency labels
    period_week: '1 week',
    period_month: '1 month',
    period_custom: (n) => `${n} days`,
    weekly_days: (n) => `${n}x/wk`,
    per_day: (n, unit) => `${n} ${unit}/day`,

    // MainTracker header
    back: '← Back',
    archived_badge: 'Archived',
    btn_archive: 'Archive',
    btn_delete: 'Delete',

    // Delete confirm
    delete_title: 'Delete this habit?',
    delete_desc: (type) => `"${type}" and all its records will be permanently deleted.`,
    btn_cancel: 'Cancel',
    btn_delete_confirm: 'Delete',

    // Archive confirm
    archive_confirm_title: 'Archive this habit?',
    archive_confirm_desc: (type) => `"${type}" will be archived. Records are saved and visible at the bottom of the list.`,
    btn_archive_confirm: 'Archive',

    // Circle stats
    stat_remaining: 'remaining',
    stat_achieved2: 'done',
    stat_goal: 'goal',
    stat_progress: 'progress',
    stat_done_label: 'Done!',

    // WeekChart
    chart_week: 'Last 7 days',
    chart_calendar_btn: 'Monthly view',
    chart_record_legend: 'Recorded',
    chart_skip_legend: 'Skipped',
    chart_locale: 'en-US',

    // Calendar
    cal_close: 'Close',
    cal_legend_done: 'Goal met',
    cal_legend_partial: 'Partial',
    cal_legend_skip: 'Skipped',
    cal_weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    cal_title: (y, m) => {
      const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      return `${names[m - 1]} ${y}`
    },

    // Achievement CTA
    cta_title: '🎉 Goal reached!',
    cta_desc: 'Archive your record or start a fresh period.',
    btn_renew_same: 'Restart (same settings)',
    btn_renew_setup: 'Restart (new settings)',
    btn_archive_only: 'Archive only',

    // Archived banner
    archived_desc: 'This habit is archived.',

    // Record input
    record_title: 'Add a record',
    date_today: 'Today',
    date_yesterday: 'Yesterday',
    date_custom: 'Pick date',
    mode_record: 'Record',
    mode_skip: 'Skip',
    skip_reason_placeholder: 'Reason (optional): rest, illness, travel…',
    note_placeholder: 'Note (optional)',
    btn_record: 'Save record',
    btn_skip_record: 'Mark as skipped',

    // Log history
    log_history: (n) => `History (${n})`,
    log_record: 'record',
    log_skip: 'skip',
    log_inherited: 'past record',
    log_edit: 'Edit',
    log_delete: 'Del',
    log_delete_confirm: 'Delete this record?',
    log_cancel: 'Cancel',
    edit_save: 'Save',
    edit_cancel: 'Cancel',

    // GoalSetup
    setup_back: '← Back',
    setup_title: 'Set your goal',
    setup_type_label: 'Habit type',
    setup_custom_btn: 'Custom',
    setup_custom_placeholder: 'e.g. Push-ups',
    setup_unit_placeholder: 'Unit',
    setup_unit_label: 'Unit:',
    setup_period_label: 'Period',
    setup_period_week: '1 week',
    setup_period_week_sub: '7 days',
    setup_period_month: '1 month',
    setup_period_month_sub: '30 days',
    setup_period_custom: 'Custom',
    setup_period_custom_sub: 'Enter days',
    setup_days_placeholder: 'e.g. 60',
    setup_days_unit: 'days',
    setup_daily_label: 'Daily target',
    setup_weekly_label: 'Weekly frequency',
    setup_weekly_display: (n) => `${n} days / week`,
    setup_preview_title: 'Auto-calculated',
    setup_preview_days: 'Active days',
    setup_preview_days_unit: '',
    setup_preview_required: 'Required (×1.15)',
    setup_preview_goal: 'Target',
    setup_submit: 'Start habit',
    setup_renew_submit: 'Restart with these settings',

    // Presets
    presets: [
      { label: 'Strength', unit: 'reps' },
      { label: 'Running', unit: 'km' },
      { label: 'Vocabulary', unit: 'words' },
      { label: 'Reading', unit: 'pages' },
      { label: 'Meditation', unit: 'min' },
    ],
  },
}

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'th', label: 'ภาษาไทย' },
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
    page_title: '継続中の目標',
    stat_count: '習慣数',
    stat_count_unit: '個',
    stat_avg: '平均達成率',
    stat_done: '達成済み',
    stat_done_unit: '個',
    empty_title: 'まずは1つ、目標を作成しましょう',
    empty_desc: 'ランニング・読書・筋トレなど、期間内に達成したい量を設定できます',
    empty_btn: '目標を追加',
    no_active: 'アクティブな目標がありません',
    add_new: '目標を追加',
    summary_active: '進行中',
    summary_avg: '平均達成率',
    summary_unrecorded: '今日の未記録',
    summary_no_record_msg: '今日はまだ記録されていません',
    summary_all_done_msg: '今日の記録はすべて完了しています！',
    card_record_btn: '記録',
    card_skip_btn: 'スキップ',
    skip_confirm_title: '今日をスキップとして記録しますか？',
    skip_confirm_ok: 'スキップする',
    fab_label: '目標を追加',
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
    stat_days_left: '残り日数',
    stat_days_left_unit: '日',

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
    mode_rest: '今日は休む',
    skip_reason_placeholder: '理由（任意）: 休養、体調不良、出張…',
    note_placeholder: 'メモ（任意）',
    record_input_placeholder: '今日の記録量を入力',
    btn_record: '記録する',
    btn_skip_record: 'スキップとして記録',
    btn_rest_record: '休みとして記録',

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
    setup_daily_placeholder: '例：3',
    setup_weekly_label: '週の頻度',
    setup_weekly_display: (n) => `週 ${n} 日`,
    setup_preview_title: '自動計算結果',
    setup_preview_days: '実施日数',
    setup_preview_days_unit: '日',
    setup_preview_required: '必要量 (×1.15)',
    setup_preview_goal: '目標値',
    setup_submit: '目標を開始する',
    setup_renew_submit: 'この設定で再開する',
    setup_buffer_label: 'バッファを追加する（+15%）',
    setup_buffer_hint: '回数に上限がある習慣ではOFF推奨',
    setup_hint_type: '習慣名を入力してください',
    setup_hint_amount: '1日の目安量を入力してください',
    setup_hint_days: 'カスタム期間の日数を入力してください',

    // Presets (label shown on button; also stored as habit.type)
    presets: [
      { label: '筋トレ', unit: '回' },
      { label: 'ランニング', unit: 'km' },
      { label: '単語暗記', unit: '個' },
      { label: '読書', unit: 'ページ' },
      { label: '瞑想', unit: '分' },
    ],

    // Help modal
    help_title: 'ヘルプ',
    help_close: '閉じる',
    help_summary: [
      '習慣を「残り量」で管理します',
      '記録すると残り量が減ります',
      '期間終了後はアーカイブして再開できます',
    ],
    help_sections: [
      {
        id: 'concept',
        title: 'アプリの考え方',
        body: '多くの習慣管理アプリは「どれだけ積み上げたか」を記録します。このアプリは逆の発想で、期間内にこなすべき総量をあらかじめ設定し、記録するたびに残りが減っていくことを可視化します。\n\n「今週あと何回走ればいいか」「今月あと何ページ読めばいいか」が一目でわかります。',
      },
      {
        id: 'setup',
        title: '目標の作り方',
        body: '習慣の種類・1日の目安量・週の頻度・期間を設定すると、目標総量が自動計算されます（バッファ+15%付き）。\n\n早起きなど回数に上限がある習慣はバッファをOFFにしてください。',
      },
      {
        id: 'record',
        title: '記録・休む',
        body: '詳細画面、またはホームの各カードから直接「記録」できます。\n\n「今日は休む」を選ぶとスキップとして記録されます。メモも追加できます。',
      },
      {
        id: 'archive',
        title: 'アーカイブ',
        body: '期間が終了したらアーカイブして記録を保存できます。同じ設定または新しい設定で次の期間を始めることもできます。',
      },
      {
        id: 'pwa',
        title: 'ホーム画面に追加',
        body: 'ブラウザの「ホーム画面に追加」からアプリのように使用できます。データはすべて端末内に保存されます。アカウント不要です。',
      },
    ],
    help_topics: [
      {
        id: 'app_desc',
        title: 'アプリの説明',
        body: '習慣を「残り量」で管理する、シンプルなトラッカー',
      },
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
    page_title: 'Active Goals',
    stat_count: 'Habits',
    stat_count_unit: '',
    stat_avg: 'Avg. Progress',
    stat_done: 'Completed',
    stat_done_unit: '',
    empty_title: 'Create your first goal',
    empty_desc: 'Set a target amount for running, reading, workouts, or anything you want to complete within a period.',
    empty_btn: 'Add Goal',
    no_active: 'No active goals',
    add_new: 'Add Goal',
    summary_active: 'Active',
    summary_avg: 'Avg. Progress',
    summary_unrecorded: 'Not recorded today',
    summary_no_record_msg: 'No record yet today',
    summary_all_done_msg: 'All recorded today!',
    card_record_btn: 'Record',
    card_skip_btn: 'Skip',
    skip_confirm_title: 'Mark today as skipped?',
    skip_confirm_ok: 'Mark as skipped',
    fab_label: 'Add Goal',
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
    stat_days_left: 'Days left',
    stat_days_left_unit: 'd',

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
    mode_rest: 'Rest today',
    skip_reason_placeholder: 'Reason (optional): rest, illness, travel…',
    note_placeholder: 'Note (optional)',
    record_input_placeholder: 'Enter today\'s amount',
    btn_record: 'Save record',
    btn_skip_record: 'Mark as skipped',
    btn_rest_record: 'Mark as rest',

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
    setup_daily_placeholder: 'e.g. 3',
    setup_weekly_label: 'Weekly frequency',
    setup_weekly_display: (n) => `${n} days / week`,
    setup_preview_title: 'Auto-calculated',
    setup_preview_days: 'Active days',
    setup_preview_days_unit: '',
    setup_preview_required: 'Required (×1.15)',
    setup_preview_goal: 'Target',
    setup_submit: 'Start habit',
    setup_renew_submit: 'Restart with these settings',
    setup_buffer_label: 'Add buffer (+15%)',
    setup_buffer_hint: 'Turn this off for habits with a fixed upper limit.',
    setup_hint_type: 'Enter a habit name',
    setup_hint_amount: 'Enter a daily target amount',
    setup_hint_days: 'Enter the number of days',

    // Presets
    presets: [
      { label: 'Strength', unit: 'reps' },
      { label: 'Running', unit: 'km' },
      { label: 'Vocabulary', unit: 'words' },
      { label: 'Reading', unit: 'pages' },
      { label: 'Meditation', unit: 'min' },
    ],

    // Help modal
    help_title: 'Help',
    help_close: 'Close',
    help_summary: [
      'Manage habits by remaining amount',
      'Each record reduces what is left',
      'Archive and restart after the period ends',
    ],
    help_sections: [
      {
        id: 'concept',
        title: 'How this app works',
        body: 'Most habit apps record how much you\'ve accumulated. This app takes the opposite approach — you set the total amount to complete within a period upfront, and each log reduces what\'s left.\n\n"How many more runs do I need this week?" The answer is always clear.',
      },
      {
        id: 'setup',
        title: 'Setting a goal',
        body: 'Set habit type, daily target, weekly frequency, and period length. The total goal is calculated automatically (with a +15% buffer).\n\nTurn off the buffer for habits with a fixed upper limit (e.g. "wake up early").',
      },
      {
        id: 'record',
        title: 'Recording & resting',
        body: 'Record from the detail screen or directly from each card on the home screen.\n\nChoose "Rest today" to log the day as a skip. You can add optional notes.',
      },
      {
        id: 'archive',
        title: 'Archiving',
        body: 'When a period ends, archive it to save your record. You can restart with the same settings or adjust them for the next period.',
      },
      {
        id: 'pwa',
        title: 'Add to home screen',
        body: 'Use your browser\'s "Add to Home Screen" option to use this app like a native app. All data is stored locally — no account needed.',
      },
    ],
    help_topics: [{ id: 'app_desc', title: 'App Description', body: 'A simple tracker that manages habits by remaining amount.' }],
  },

  th: {
    // Greetings
    greeting_morning: 'อรุณสวัสดิ์',
    greeting_afternoon: 'สวัสดีตอนบ่าย',
    greeting_evening: 'สวัสดีตอนเย็น',

    // Quote widget
    quote_add: '+ เพิ่มคำคม',
    quote_placeholder: 'ใส่คำคมหรือคติประจำใจ…',
    quote_save: 'บันทึก',

    // HabitList
    page_title: 'เป้าหมายที่กำลังทำ',
    stat_count: 'นิสัย',
    stat_count_unit: '',
    stat_avg: 'ความคืบหน้าเฉลี่ย',
    stat_done: 'สำเร็จแล้ว',
    stat_done_unit: '',
    empty_title: 'สร้างเป้าหมายแรกของคุณ',
    empty_desc: 'ตั้งปริมาณเป้าหมายสำหรับการวิ่ง การอ่าน การออกกำลังกาย หรืออะไรก็ได้ที่อยากทำให้เสร็จในระยะเวลาหนึ่ง',
    empty_btn: 'เพิ่มเป้าหมาย',
    no_active: 'ไม่มีเป้าหมายที่กำลังทำ',
    add_new: 'เพิ่มเป้าหมาย',
    summary_active: 'กำลังทำ',
    summary_avg: 'ความคืบหน้าเฉลี่ย',
    summary_unrecorded: 'ยังไม่บันทึกวันนี้',
    summary_no_record_msg: 'วันนี้ยังไม่มีการบันทึก',
    summary_all_done_msg: 'บันทึกครบทุกอย่างแล้ววันนี้!',
    card_record_btn: 'บันทึก',
    card_skip_btn: 'ข้าม',
    skip_confirm_title: 'บันทึกวันนี้เป็นวันที่ข้ามหรือไม่?',
    skip_confirm_ok: 'บันทึกว่าข้าม',
    fab_label: 'เพิ่มเป้าหมาย',
    badge_done: 'สำเร็จ',
    badge_archived: 'เก็บถาวร',
    label_achieved: 'ทำแล้ว',
    label_remaining: 'เหลือ',
    archive_section: (n) => `เก็บถาวร (${n})`,

    // Period / frequency labels
    period_week: '1 สัปดาห์',
    period_month: '1 เดือน',
    period_custom: (n) => `${n} วัน`,
    weekly_days: (n) => `${n} วัน/สัปดาห์`,
    per_day: (n, unit) => `${n} ${unit}/วัน`,

    // MainTracker header
    back: '← กลับ',
    archived_badge: 'เก็บถาวรแล้ว',
    btn_archive: 'เก็บถาวร',
    btn_delete: 'ลบ',

    // Delete confirm
    delete_title: 'ลบนิสัยนี้?',
    delete_desc: (type) => `"${type}" และบันทึกทั้งหมดจะถูกลบถาวร`,
    btn_cancel: 'ยกเลิก',
    btn_delete_confirm: 'ลบ',

    // Archive confirm
    archive_confirm_title: 'เก็บถาวรนิสัยนี้?',
    archive_confirm_desc: (type) => `"${type}" จะถูกเก็บถาวร บันทึกยังคงอยู่และดูได้ที่ด้านล่างของรายการ`,
    btn_archive_confirm: 'เก็บถาวร',

    // Circle stats
    stat_remaining: 'เหลือ',
    stat_achieved2: 'ทำแล้ว',
    stat_goal: 'เป้าหมาย',
    stat_progress: 'ความคืบหน้า',
    stat_done_label: 'สำเร็จ!',
    stat_days_left: 'วันเหลือ',
    stat_days_left_unit: 'วัน',

    // WeekChart
    chart_week: '7 วันล่าสุด',
    chart_calendar_btn: 'ปฏิทินรายเดือน',
    chart_record_legend: 'บันทึก',
    chart_skip_legend: 'ข้าม',
    chart_locale: 'th-TH',

    // Calendar
    cal_close: 'ปิด',
    cal_legend_done: 'ถึงเป้าหมาย',
    cal_legend_partial: 'บางส่วน',
    cal_legend_skip: 'ข้าม',
    cal_weekdays: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
    cal_title: (y, m) => {
      const names = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.']
      return `${names[m - 1]} ${y}`
    },

    // Achievement CTA
    cta_title: '🎉 ถึงเป้าหมายแล้ว!',
    cta_desc: 'เก็บถาวรหรือเริ่มช่วงเวลาใหม่',
    btn_renew_same: 'เริ่มใหม่ (การตั้งค่าเดิม)',
    btn_renew_setup: 'เริ่มใหม่ (เปลี่ยนการตั้งค่า)',
    btn_archive_only: 'เก็บถาวรอย่างเดียว',

    // Archived banner
    archived_desc: 'นิสัยนี้ถูกเก็บถาวรแล้ว',

    // Record input
    record_title: 'เพิ่มบันทึก',
    date_today: 'วันนี้',
    date_yesterday: 'เมื่อวาน',
    date_custom: 'เลือกวันที่',
    mode_record: 'บันทึก',
    mode_skip: 'ข้าม',
    mode_rest: 'พักวันนี้',
    skip_reason_placeholder: 'เหตุผล (ไม่บังคับ): พักผ่อน, ป่วย, เดินทาง…',
    note_placeholder: 'บันทึก (ไม่บังคับ)',
    record_input_placeholder: 'กรอกจำนวนวันนี้',
    btn_record: 'บันทึก',
    btn_skip_record: 'บันทึกว่าข้าม',
    btn_rest_record: 'บันทึกว่าพัก',

    // Log history
    log_history: (n) => `ประวัติ (${n})`,
    log_record: 'บันทึก',
    log_skip: 'ข้าม',
    log_inherited: 'บันทึกเก่า',
    log_edit: 'แก้ไข',
    log_delete: 'ลบ',
    log_delete_confirm: 'ลบบันทึกนี้?',
    log_cancel: 'ยกเลิก',
    edit_save: 'บันทึก',
    edit_cancel: 'ยกเลิก',

    // GoalSetup
    setup_back: '← กลับ',
    setup_title: 'ตั้งเป้าหมาย',
    setup_type_label: 'ประเภทนิสัย',
    setup_custom_btn: 'กำหนดเอง',
    setup_custom_placeholder: 'เช่น วิดพื้น',
    setup_unit_placeholder: 'หน่วย',
    setup_unit_label: 'หน่วย:',
    setup_period_label: 'ระยะเวลา',
    setup_period_week: '1 สัปดาห์',
    setup_period_week_sub: '7 วัน',
    setup_period_month: '1 เดือน',
    setup_period_month_sub: '30 วัน',
    setup_period_custom: 'กำหนดเอง',
    setup_period_custom_sub: 'ใส่จำนวนวัน',
    setup_days_placeholder: 'เช่น 60',
    setup_days_unit: 'วัน',
    setup_daily_label: 'เป้าหมายต่อวัน',
    setup_daily_placeholder: 'เช่น 3',
    setup_weekly_label: 'ความถี่ต่อสัปดาห์',
    setup_weekly_display: (n) => `${n} วัน / สัปดาห์`,
    setup_preview_title: 'คำนวณอัตโนมัติ',
    setup_preview_days: 'วันที่ทำ',
    setup_preview_days_unit: '',
    setup_preview_required: 'ที่ต้องการ (×1.15)',
    setup_preview_goal: 'เป้าหมาย',
    setup_submit: 'เริ่มนิสัย',
    setup_renew_submit: 'เริ่มใหม่ด้วยการตั้งค่านี้',
    setup_buffer_label: 'เพิ่มบัฟเฟอร์ (+15%)',
    setup_buffer_hint: 'ปิดสำหรับนิสัยที่มีจำนวนจำกัด เช่น "ตื่นเช้า"',
    setup_hint_type: 'กรุณาใส่ชื่อนิสัย',
    setup_hint_amount: 'กรุณาใส่เป้าหมายต่อวัน',
    setup_hint_days: 'กรุณาใส่จำนวนวัน',

    // Presets
    presets: [
      { label: 'ออกกำลังกาย', unit: 'ครั้ง' },
      { label: 'วิ่ง', unit: 'กม.' },
      { label: 'ท่องศัพท์', unit: 'คำ' },
      { label: 'อ่านหนังสือ', unit: 'หน้า' },
      { label: 'นั่งสมาธิ', unit: 'นาที' },
    ],

    // Help modal
    help_title: 'ช่วยเหลือ',
    help_close: 'ปิด',
    help_summary: [
      'จัดการนิสัยด้วย "ปริมาณที่เหลือ"',
      'ทุกครั้งที่บันทึก ปริมาณที่เหลือจะลดลง',
      'เก็บถาวรและเริ่มใหม่หลังหมดรอบ',
    ],
    help_sections: [
      {
        id: 'concept',
        title: 'แนวคิดของแอป',
        body: 'แอปนิสัยส่วนใหญ่บันทึกว่าสะสมได้เท่าไหร่ แอปนี้คิดแบบตรงกันข้าม — คุณตั้งปริมาณรวมที่ต้องทำให้เสร็จในแต่ละรอบไว้ล่วงหน้า และทุกครั้งที่บันทึก ปริมาณที่เหลือจะลดลง\n\n"สัปดาห์นี้ต้องวิ่งอีกกี่ครั้ง?" เห็นคำตอบได้ทันที',
      },
      {
        id: 'setup',
        title: 'การตั้งเป้าหมาย',
        body: 'ตั้งค่าประเภทนิสัย เป้าหมายต่อวัน ความถี่ต่อสัปดาห์ และระยะเวลา ระบบจะคำนวณเป้าหมายรวมอัตโนมัติ (เพิ่ม +15%)\n\nปิดบัฟเฟอร์สำหรับนิสัยที่มีจำนวนจำกัด เช่น "ตื่นเช้า"',
      },
      {
        id: 'record',
        title: 'บันทึกและพัก',
        body: 'บันทึกจากหน้ารายละเอียด หรือจากการ์ดแต่ละอันในหน้าหลักโดยตรง\n\nเลือก "พักวันนี้" เพื่อบันทึกว่าข้าม สามารถเพิ่มโน้ตได้',
      },
      {
        id: 'archive',
        title: 'การเก็บถาวร',
        body: 'เมื่อหมดรอบ เก็บถาวรเพื่อบันทึกผล สามารถเริ่มใหม่ด้วยการตั้งค่าเดิมหรือปรับใหม่สำหรับรอบถัดไป',
      },
      {
        id: 'pwa',
        title: 'เพิ่มในหน้าจอหลัก',
        body: 'ใช้ตัวเลือก "เพิ่มในหน้าจอหลัก" ของเบราว์เซอร์เพื่อใช้แอปเหมือนแอปพลิเคชัน ข้อมูลทั้งหมดบันทึกในอุปกรณ์ ไม่ต้องสมัครสมาชิก',
      },
    ],
    help_topics: [{ id: 'app_desc', title: 'คำอธิบายแอป', body: 'แอปติดตามนิสัยด้วย "ปริมาณที่เหลือ"' }],
  },
}

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>TACTICAL ATTENDANCE SYSTEM</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier New', 'Monaco', monospace;
            background: linear-gradient(135deg, #1a1a1a 0%, #0d4f3c 50%, #1a1a1a 100%);
            min-height: 100vh;
            padding: 10px;
            color: #00ff00;
            overflow-x: hidden;
        }

        .container {
            max-width: 100%;
            margin: 0 auto;
            background: rgba(0, 20, 0, 0.9);
            border: 2px solid #00ff00;
            border-radius: 8px;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
            overflow: hidden;
            position: relative;
        }

        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 255, 0, 0.03) 2px,
                    rgba(0, 255, 0, 0.03) 4px
                );
            pointer-events: none;
            z-index: 1;
        }

        .header {
            background: linear-gradient(45deg, #001100, #003300);
            color: #00ff00;
            padding: 20px 15px;
            text-align: center;
            position: relative;
            border-bottom: 2px solid #00ff00;
            z-index: 2;
        }

        .header::before {
            content: '████████████████████████████████████████';
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 8px;
            opacity: 0.3;
            letter-spacing: 1px;
        }

        .header h1 {
            font-size: 1.8rem;
            margin-bottom: 10px;
            text-shadow: 0 0 10px #00ff00;
            letter-spacing: 2px;
            font-weight: bold;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 15px;
        }

        .stat-item {
            text-align: center;
            background: rgba(0, 50, 0, 0.5);
            padding: 10px 5px;
            border: 1px solid #00aa00;
            border-radius: 4px;
        }

        .stat-value {
            font-size: 1.2rem;
            font-weight: bold;
            color: #00ff00;
            text-shadow: 0 0 5px #00ff00;
        }

        .stat-label {
            font-size: 0.7rem;
            opacity: 0.8;
            margin-top: 2px;
        }

        .current-status {
            background: rgba(0, 30, 0, 0.8);
            color: #00ff00;
            padding: 15px;
            text-align: center;
            position: relative;
            border-bottom: 1px solid #00aa00;
            font-weight: bold;
            z-index: 2;
        }

        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }

        .status-ready { background: #ffaa00; }
        .status-active { background: #00ff00; }
        .status-break { background: #ff6600; }

        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }

        .controls {
            padding: 15px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            background: rgba(0, 20, 0, 0.8);
            border-bottom: 1px solid #00aa00;
            z-index: 2;
            position: relative;
        }

        .btn {
            padding: 12px 8px;
            border: 2px solid;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Courier New', monospace;
            background: rgba(0, 0, 0, 0.7);
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s;
        }

        .btn:active::before {
            left: 100%;
        }

        .btn-success {
            border-color: #00ff00;
            color: #00ff00;
            text-shadow: 0 0 5px #00ff00;
        }

        .btn-success:hover {
            background: rgba(0, 255, 0, 0.1);
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
        }

        .btn-warning {
            border-color: #ffaa00;
            color: #ffaa00;
            text-shadow: 0 0 5px #ffaa00;
        }

        .btn-warning:hover {
            background: rgba(255, 170, 0, 0.1);
            box-shadow: 0 0 15px rgba(255, 170, 0, 0.5);
        }

        .btn-danger {
            border-color: #ff4444;
            color: #ff4444;
            text-shadow: 0 0 5px #ff4444;
        }

        .btn-danger:hover {
            background: rgba(255, 68, 68, 0.1);
            box-shadow: 0 0 15px rgba(255, 68, 68, 0.5);
        }

        .btn-primary {
            border-color: #0099ff;
            color: #0099ff;
            text-shadow: 0 0 5px #0099ff;
        }

        .btn-primary:hover {
            background: rgba(0, 153, 255, 0.1);
            box-shadow: 0 0 15px rgba(0, 153, 255, 0.5);
        }

        .manual-section {
            padding: 15px;
            background: rgba(0, 20, 0, 0.8);
            border-bottom: 1px solid #00aa00;
            z-index: 2;
            position: relative;
        }

        .manual-title {
            color: #00ff00;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .input-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 10px;
        }

        .input-full {
            grid-column: 1 / -1;
        }

        input, select {
            padding: 8px;
            border: 1px solid #00aa00;
            border-radius: 4px;
            font-size: 12px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            font-family: 'Courier New', monospace;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #00ff00;
            box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
        }

        .table-container {
            padding: 15px;
            overflow-x: auto;
            z-index: 2;
            position: relative;
            max-height: 60vh;
            overflow-y: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00aa00;
            font-size: 12px;
        }

        th {
            background: rgba(0, 50, 0, 0.9);
            color: #00ff00;
            padding: 8px 4px;
            text-align: left;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 10px;
            border: 1px solid #00aa00;
            position: sticky;
            top: 0;
            z-index: 3;
        }

        td {
            padding: 6px 4px;
            border: 1px solid #004400;
            color: #00dd00;
            font-size: 11px;
        }

        tr:nth-child(even) {
            background: rgba(0, 20, 0, 0.3);
        }

        tr:hover {
            background: rgba(0, 255, 0, 0.1);
        }

        .status-work {
            background: rgba(0, 255, 0, 0.2);
            color: #00ff00;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
            border: 1px solid #00aa00;
        }

        .status-paid {
            background: rgba(0, 153, 255, 0.2);
            color: #0099ff;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
            border: 1px solid #0088cc;
        }

        .delete-btn {
            background: rgba(255, 68, 68, 0.2);
            color: #ff4444;
            border: 1px solid #ff4444;
            padding: 3px 6px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 9px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .delete-btn:hover {
            background: rgba(255, 68, 68, 0.4);
            box-shadow: 0 0 8px rgba(255, 68, 68, 0.5);
        }

        .export-section {
            padding: 15px;
            background: rgba(0, 30, 0, 0.8);
            border-top: 1px solid #00aa00;
            z-index: 2;
            position: relative;
        }

        .export-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            align-items: center;
        }

        .tactical-grid {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(0, 255, 0, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 0, 0.02) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            z-index: 0;
        }

        /* スマホ最適化 */
        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.4rem;
            }
            
            .controls {
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            
            .btn {
                padding: 10px 6px;
                font-size: 12px;
            }
            
            .stats {
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
            }
            
            .stat-value {
                font-size: 1rem;
            }
            
            .stat-label {
                font-size: 0.6rem;
            }
            
            table {
                font-size: 10px;
            }
            
            th, td {
                padding: 4px 2px;
            }
            
            .table-container {
                max-height: 50vh;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 5px;
            }
            
            .header h1 {
                font-size: 1.2rem;
            }
            
            .controls {
                grid-template-columns: 1fr;
                gap: 6px;
            }
            
            .input-grid {
                grid-template-columns: 1fr;
                gap: 6px;
            }
            
            .export-grid {
                grid-template-columns: 1fr;
                gap: 8px;
            }
        }

        /* タッチ最適化 */
        .btn {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }

        input, select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
    </style>
</head>
<body>
    <div class="tactical-grid"></div>
    
    <div class="container">
        <div class="header">
            <h1>◤ TACTICAL ATTENDANCE ◢</h1>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-value" id="workDays">0</div>
                    <div class="stat-label">MISSIONS</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="paidDays">0</div>
                    <div class="stat-label">LEAVE</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="totalHours">0:00</div>
                    <div class="stat-label">TOTAL OPS</div>
                </div>
            </div>
        </div>

        <div class="current-status" id="currentStatus">
            <span class="status-indicator status-ready"></span>STANDBY - <span id="currentTime"></span>
        </div>

        <div class="controls">
            <button class="btn btn-success" onclick="clockIn()">DEPLOY</button>
            <button class="btn btn-danger" onclick="clockOut()">RTB</button>
            <button class="btn btn-warning" onclick="startBreak()">BREAK</button>
            <button class="btn btn-primary" onclick="endBreak()">RESUME</button>
        </div>

        <div class="manual-section">
            <div class="manual-title">◤ MANUAL ENTRY ◢</div>
            <div class="input-grid">
                <select id="recordType">
                    <option value="出勤">MISSION</option>
                    <option value="有給">LEAVE</option>
                </select>
                <input type="date" id="manualDate" />
                <input type="time" id="startTime" placeholder="START" />
                <input type="time" id="endTime" placeholder="END" />
            </div>
            <div class="input-grid">
                <input type="number" id="breakMinutes" placeholder="BREAK (MIN)" min="0" value="0" />
                <button class="btn btn-primary input-full" onclick="addManualRecord()">ADD RECORD</button>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>TYPE</th>
                        <th>START</th>
                        <th>END</th>
                        <th>BREAK</th>
                        <th>TOTAL</th>
                        <th>DEL</th>
                    </tr>
                </thead>
                <tbody id="attendanceTable">
                </tbody>
            </table>
        </div>

        <div class="export-section">
            <div class="export-grid">
                <input type="month" id="exportMonth" />
                <button class="btn btn-primary" onclick="exportData()">EXPORT</button>
                <button class="btn btn-danger" onclick="clearAllData()">PURGE ALL</button>
            </div>
        </div>
    </div>

    <script>
        let attendanceData = [];
        let currentSession = null;

        // データの初期化
        function initializeData() {
            try {
                const stored = localStorage.getItem('attendanceData');
                attendanceData = stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.error('Failed to load attendance data:', e);
                attendanceData = [];
            }

            try {
                const storedSession = localStorage.getItem('currentSession');
                currentSession = storedSession ? JSON.parse(storedSession) : null;
            } catch (e) {
                console.error('Failed to load current session:', e);
                currentSession = null;
            }
        }

        function saveData() {
            try {
                localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
            } catch (e) {
                console.error('Failed to save attendance data:', e);
                alert('データの保存に失敗しました');
            }
        }

        function saveSession() {
            try {
                if (currentSession) {
                    localStorage.setItem('currentSession', JSON.stringify(currentSession));
                } else {
                    localStorage.removeItem('currentSession');
                }
            } catch (e) {
                console.error('Failed to save session:', e);
            }
        }

        function updateCurrentTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ja-JP', { hour12: false });
            const timeElement = document.getElementById('currentTime');
            const statusElement = document.getElementById('currentStatus');
            
            if (timeElement) {
                timeElement.textContent = timeString;
            }
            
            if (currentSession && statusElement) {
                if (currentSession.status === 'working') {
                    statusElement.innerHTML = 
                        `<span class="status-indicator status-active"></span>MISSION ACTIVE - ${timeString}`;
                } else if (currentSession.status === 'break') {
                    statusElement.innerHTML = 
                        `<span class="status-indicator status-break"></span>ON BREAK - ${timeString}`;
                }
            } else if (statusElement) {
                statusElement.innerHTML = 
                    `<span class="status-indicator status-ready"></span>STANDBY - ${timeString}`;
            }
        }

        function clockIn() {
            try {
                const now = new Date();
                currentSession = {
                    date: now.toISOString().split('T')[0],
                    startTime: now.toTimeString().slice(0, 5),
                    status: 'working',
                    breakTime: 0
                };
                saveSession();
                updateCurrentTime();
            } catch (e) {
                console.error('Clock in failed:', e);
                alert('出勤登録に失敗しました');
            }
        }

        function startBreak() {
            if (currentSession && currentSession.status === 'working') {
                try {
                    currentSession.status = 'break';
                    currentSession.breakStart = new Date().toTimeString().slice(0, 5);
                    saveSession();
                    updateCurrentTime();
                } catch (e) {
                    console.error('Start break failed:', e);
                    alert('休憩開始に失敗しました');
                }
            }
        }

        function endBreak() {
            if (currentSession && currentSession.status === 'break') {
                try {
                    const breakStart = new Date(`2000-01-01 ${currentSession.breakStart}`);
                    const breakEnd = new Date();
                    const breakDuration = Math.round((breakEnd - breakStart) / (1000 * 60));
                    currentSession.breakTime += Math.max(0, breakDuration);
                    currentSession.status = 'working';
                    delete currentSession.breakStart;
                    saveSession();
                    updateCurrentTime();
                } catch (e) {
                    console.error('End break failed:', e);
                    alert('休憩終了に失敗しました');
                }
            }
        }

        function clockOut() {
            if (currentSession) {
                try {
                    const now = new Date();
                    const endTime = now.toTimeString().slice(0, 5);
                    
                    // 休憩中の場合は休憩を終了
                    if (currentSession.status === 'break') {
                        endBreak();
                    }
                    
                    const workMinutes = calculateWorkMinutes(currentSession.startTime, endTime, currentSession.breakTime);
                    
                    attendanceData.push({
                        date: currentSession.date,
                        type: '出勤',
                        startTime: currentSession.startTime,
                        endTime: endTime,
                        breakTime: currentSession.breakTime,
                        workMinutes: workMinutes
                    });
                    
                    currentSession = null;
                    saveData();
                    saveSession();
                    updateTable();
                    updateStats();
                    updateCurrentTime();
                } catch (e) {
                    console.error('Clock out failed:', e);
                    alert('退勤登録に失敗しました');
                }
            }
        }

        function addManualRecord() {
            try {
                const type = document.getElementById('recordType').value;
                const date = document.getElementById('manualDate').value;
                const startTime = document.getElementById('startTime').value;
                const endTime = document.getElementById('endTime').value;
                const breakMinutes = parseInt(document.getElementById('breakMinutes').value) || 0;

                if (!date) {
                    alert('日付を入力してください');
                    return;
                }

                let workMinutes = 0;
                if (type === '出勤' && startTime && endTime) {
                    workMinutes = calculateWorkMinutes(startTime, endTime, breakMinutes);
                    if (workMinutes < 0) {
                        alert('終了時間が開始時間より前です');
                        return;
                    }
                }

                attendanceData.push({
                    date: date,
                    type: type,
                    startTime: startTime || '',
                    endTime: endTime || '',
                    breakTime: breakMinutes,
                    workMinutes: workMinutes
                });

                attendanceData.sort((a, b) => new Date(a.date) - new Date(b.date));
                saveData();
                updateTable();
                updateStats();
                clearForm();
            } catch (e) {
                console.error('Add manual record failed:', e);
                alert('手動記録の追加に失敗しました');
            }
        }

        function calculateWorkMinutes(startTime, endTime, breakMinutes) {
            try {
                const start = new Date(`2000-01-01 ${startTime}`);
                const end = new Date(`2000-01-01 ${endTime}`);
                const totalMinutes = (end - start) / (1000 * 60);
                return Math.max(0, totalMinutes - breakMinutes);
            } catch (e) {
                console.error('Calculate work minutes failed:', e);
                return 0;
            }
        }

        function formatMinutes(minutes) {
            if (!minutes || minutes < 0) return '0:00';
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours}:${mins.toString().padStart(2, '0')}`;
        }

        function formatBreakTime(minutes) {
            if (!minutes || minutes === 0) return '';
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            if (hours > 0) {
                return `${hours}:${mins.toString().padStart(2, '0')}`;
            }
            return `${mins}分`;
        }

        function updateTable() {
            try {
                const tbody = document.getElementById('attendanceTable');
                if (!tbody) return;
                
                tbody.innerHTML = '';

                attendanceData.forEach((record, index) => {
                    const row = tbody.insertRow();
                    const date = new Date(record.date + 'T00:00:00');
                    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
                    
                    row.innerHTML = `
                        <td>${record.date.split('-').slice(1).join('/')}(${dayOfWeek})</td>
                        <td><span class="status-${record.type === '出勤' ? 'work' : 'paid'}">${record.type === '出勤' ? 'WORK' : 'LEAVE'}</span></td>
                        <td>${record.startTime}</td>
                        <td>${record.endTime}</td>
                        <td>${formatBreakTime(record.breakTime)}</td>
                        <td>${record.type === '出勤' ? formatMinutes(record.workMinutes) : ''}</td>
                        <td><button class="delete-btn" onclick="deleteRecord(${index})">×</button></td>
                    `;
                });
            } catch (e) {
                console.error('Update table failed:', e);
            }
        }

        function deleteRecord(index) {
            if (confirm('この記録を削除しますか？')) {
                try {
                    attendanceData.splice(index, 1);
                    saveData();
                    updateTable();
                    updateStats();
                } catch (e) {
                    console.error('Delete record failed:', e);
                    alert('記録の削除に失敗しました');
                }
            }
        }

        function updateStats() {
            try {
                const workDays = attendanceData.filter(r => r.type === '出勤').length;
                const paidDays = attendanceData.filter(r => r.type === '有給').length;
                const totalMinutes = attendanceData.reduce((sum, r) => sum + (r.workMinutes || 0), 0);

                const workDaysEl = document.getElementById('workDays');
                const paidDaysEl = document.getElementById('paidDays');
                const totalHoursEl = document.getElementById('totalHours');

                if (workDaysEl) workDaysEl.textContent = workDays;
                if (paidDaysEl) paidDaysEl.textContent = paidDays;
                if (totalHoursEl) totalHoursEl.textContent = formatMinutes(totalMinutes);
            } catch (e) {
                console.error('Update stats failed:', e);
            }
        }

        function clearForm() {
            try {
                document.getElementById('manualDate').value = '';
                document.getElementById('startTime').value = '';
                document.getElementById('endTime').value = '';
                document.getElementById('breakMinutes').value = '0';
            } catch (e) {
                console.error('Clear form failed:', e);
            }
        }

        function exportData() {
            try {
                const month = document.getElementById('exportMonth').value;
                let dataToExport = attendanceData;
                
                if (month) {
                    dataToExport = attendanceData.filter(record => record.date.startsWith(month));
                }

                const csv = [
                    ['日付', '区分', '開始', '終了', '休憩', '労働時間'],
                    ...dataToExport.map(record => [
                        record.date,
                        record.type,
                        record.startTime,
                        record.endTime,
                        formatBreakTime(record.breakTime),
                        record.type === '出勤' ? formatMinutes(record.workMinutes) : ''
                    ])
                ].map(row => row.join(',')).join('\n');

                const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `tactical_attendance_${month || 'all'}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Export failed:', e);
                alert('エクスポートに失敗しました');
            }
        }

        function clearAllData() {
            if (confirm('全ての作戦記録を削除しますか？この操作は取り消せません。')) {
                try {
                    attendanceData = [];
                    currentSession = null;
                    localStorage.removeItem('attendanceData');
                    localStorage.removeItem('currentSession');
                    updateTable();
                    updateStats();
                    updateCurrentTime();
                } catch (e) {
                    console.error('Clear all data failed:', e);
                    alert('データ削除に失敗しました');
                }
            }
        }

        // 初期化
        function initialize() {
            try {
                initializeData();
                const now = new Date();
                document.getElementById('exportMonth').value = now.toISOString().slice(0, 7);
                updateTable();
                updateStats();
                updateCurrentTime();
                
                // 時刻更新のインターバル設定
                setInterval(updateCurrentTime, 1000);
            } catch (e) {
                console.error('Initialization failed:', e);
            }
        

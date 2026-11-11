/** eHadir adapter for SFE Academy's existing attendance action. No data storage. */
const statuses = new Set(['Present', 'Absent', 'Late', 'Excused', 'Unmarked']);
const identifier = /^[A-Za-z0-9_-]{1,100}$/;

export function attendanceAction({classId, date, roster, rows}) {
  if (!identifier.test(classId ?? '')) throw new Error('Choose a class.');
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date)
    throw new Error('Choose a valid calendar date.');
  if (!Array.isArray(roster) || !roster.length || roster.length > 2000 ||
      roster.some(id => typeof id !== 'string' || !identifier.test(id)) || new Set(roster).size !== roster.length)
    throw new Error('Supply the current class roster, without duplicates.');
  if (!Array.isArray(rows) || rows.length !== roster.length)
    throw new Error('Review every learner before replacing the attendance roster.');
  const allowed = new Set(roster), values = Object.create(null);
  for (const row of rows) {
    if (!row || !allowed.has(row.studentId) || Object.hasOwn(values,row.studentId) || !statuses.has(row.status))
      throw new Error('Use one recognised status for each enrolled learner.');
    values[row.studentId] = row.status;
  }
  return {type:'attendance', classId, date, values};
}

export function attendanceSummary(values) {
  const counts = Object.fromEntries([...statuses].map(status=>[status,0]));
  for (const status of Object.values(values)) {
    if (!statuses.has(status)) throw new Error('Unknown attendance status.');
    counts[status]++;
  }
  const enrolled = Object.values(counts).reduce((a,b)=>a+b,0);
  const marked = enrolled-counts.Unmarked;
  const eligible = marked-counts.Excused;
  return {enrolled,marked,counts,attendanceRate:eligible ? Math.round((counts.Present+counts.Late)/eligible*10000)/100 : null};
}


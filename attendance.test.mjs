import test from 'node:test';
import assert from 'node:assert/strict';
import {attendanceAction,attendanceSummary} from './attendance.mjs';
const input = ()=>({classId:'class-1',date:'2026-11-11',roster:['a','b'],rows:[{studentId:'a',status:'Present'},{studentId:'b',status:'Late'}]});
test('creates the existing Academy action with a complete roster',()=>{const action=attendanceAction(input());assert.equal(action.type,'attendance');assert.equal(action.values.b,'Late');});
test('rejects calendar rollover dates',()=>{assert.throws(()=>attendanceAction({...input(),date:'2026-02-30'}));});
test('rejects partial, duplicate and unenrolled rows',()=>{for(const rows of [[{studentId:'a',status:'Present'}],[{studentId:'a',status:'Present'},{studentId:'a',status:'Late'}],[{studentId:'a',status:'Present'},{studentId:'x',status:'Late'}]])assert.throws(()=>attendanceAction({...input(),rows}));});
test('does not invent attendance for unmarked or excused learners',()=>{assert.equal(attendanceSummary({a:'Unmarked',b:'Excused'}).attendanceRate,null);assert.equal(attendanceSummary({a:'Present',b:'Absent',c:'Excused'}).attendanceRate,50);});
test('summary contains counts, never learner identifiers',()=>{const summary=attendanceSummary({learnerPrivate:'Present'});assert.equal(JSON.stringify(summary).includes('learnerPrivate'),false);});


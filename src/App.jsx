// App.jsx
// Run with: npx create-react-app edu-erp
// Replace src/App.js with this code and place app.css in src/

import React, { useState } from "react";
import "./app.css";

function Header() {
  return (
    <header className="erp-header">
      <h1>EduERP — Demo</h1>
      <p className="subtitle">
        Customizable ERP for Educational Institutions
      </p>
    </header>
  );
}

function RoleSelector({ role, setRole }) {
  return (
    <div className="role-selector">
      <label>Select role: </label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        <option value="institution">Administrator</option>
      </select>
    </div>
  );
}

function AdminPanel({ settings, setSettings, users, setUsers }) {
  const toggleFeature = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  const addUser = () => {
    const id = users.length + 1;
    const newUser = { id, name: `User ${id}`, role: "student" };
    setUsers((u) => [...u, newUser]);
  };

  return (
    <div className="panel">
      <h2>System Admin</h2>
      <div className="card">
        <h3>ERP Settings</h3>
        <label>
          <input
            type="checkbox"
            checked={settings.attendanceEnabled}
            onChange={() => toggleFeature("attendanceEnabled")}
          />
          Attendance Module
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.gradingEnabled}
            onChange={() => toggleFeature("gradingEnabled")}
          />
          Grading Module
        </label>
      </div>

      <div className="card">
        <h3>Users</h3>
        <button onClick={addUser}>Add sample user</button>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} — {u.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TeacherPanel({ students, setStudents }) {
  const addGrade = (id) => {
    const grade = prompt(
      "Enter grade for student id " + id + " (e.g. A or 78):"
    );
    if (!grade) return;
    setStudents((s) => s.map((st) => (st.id === id ? { ...st, grade } : st)));
  };

  return (
    <div className="panel">
      <h2>Teacher</h2>
      <div className="card">
        <h3>Students</h3>
        <table className="simple-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Attendance</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.attendance}%</td>
                <td>{s.grade ?? "-"}</td>
                <td>
                  <button onClick={() => addGrade(s.id)}>Add/Edit Grade</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentPanel({ currentStudent }) {
  if (!currentStudent)
    return (
      <div className="panel">
        <p>No student selected.</p>
      </div>
    );
  return (
    <div className="panel">
      <h2>Student View</h2>
      <div className="card">
        <h3>{currentStudent.name}</h3>
        <p>
          <strong>Attendance:</strong> {currentStudent.attendance}%
        </p>
        <p>
          <strong>Grade:</strong> {currentStudent.grade ?? "Not graded"}
        </p>
        <div className="actions">
          <button onClick={() => alert("Messaging teacher...")}>
            Message Teacher
          </button>
          <button onClick={() => alert("Downloading transcript...")}>
            Download Transcript
          </button>
        </div>
      </div>
    </div>
  );
}

function InstitutionPanel({ reports }) {
  return (
    <div className="panel">
      <h2>Institution Administrator</h2>
      <div className="card">
        <h3>Quick Reports</h3>
        <ul>
          <li>Average Attendance: {reports.avgAttendance}%</li>
          <li>Total Students: {reports.totalStudents}</li>
          <li>Average Grade (mock): {reports.avgGrade}</li>
        </ul>
        <button onClick={() => alert("Generating report...")}>
          Generate Full Report
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("admin");
  const [settings, setSettings] = useState({
    attendanceEnabled: true,
    gradingEnabled: true,
  });
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "teacher" },
    { id: 2, name: "Bob", role: "student" },
  ]);

  const [students, setStudents] = useState([
    { id: 2, name: "Bob", attendance: 92, grade: "A" },
    { id: 3, name: "Charlie", attendance: 85, grade: null },
  ]);

  const reports = {
    avgAttendance: Math.round(
      students.reduce((a, b) => a + b.attendance, 0) / students.length
    ),
    totalStudents: students.length,
    avgGrade: "B+",
  };

  const currentStudent = students[0];

  return (
    <div className="app-root">
      <Header />
      <div className="controls">
        <RoleSelector role={role} setRole={setRole} />
      </div>

      <main className="content">
        {role === "admin" && (
          <AdminPanel
            settings={settings}
            setSettings={setSettings}
            users={users}
            setUsers={setUsers}
          />
        )}
        {role === "teacher" && (
          <TeacherPanel students={students} setStudents={setStudents} />
        )}
        {role === "student" && (
          <StudentPanel currentStudent={currentStudent} />
        )}
        {role === "institution" && <InstitutionPanel reports={reports} />}
      </main>

      <footer className="footer">
        Demo ERP • Built with React • Use as a starting point
      </footer>
    </div>
  );
}

import { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from "react";
import "./App.css";

// Context for Theme
const ThemeContext = createContext();

function App() {
  const [users] = useState([
    { id: 1, name: "Ali", role: "Admin" },
    { id: 2, name: "Sara", role: "Editor" },
    { id: 3, name: "Ahmed", role: "User" },
    { id: 4, name: "Zara", role: "Manager" },
  ]);

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const inputRef = useRef(null);

  // Auto focus input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Optimized search
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? "dashboard dark" : "dashboard"}>
        <Header />

        <div className="controls">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ThemeButton />
        </div>

        <Stats users={users} />

        <UserList users={filteredUsers} />
      </div>
    </ThemeContext.Provider>
  );
}

// Header
function Header() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <h1 className="title">
      Mini Dashboard ({darkMode ? "Dark Mode" : "Light Mode"})
    </h1>
  );
}

// Theme Button
function ThemeButton() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="btn">
      Toggle Theme
    </button>
  );
}

// Stats Cards
function Stats({ users }) {
  const totalUsers = users.length;

  const adminCount = users.filter((u) => u.role === "Admin").length;

  return (
    <div className="stats">
      <div className="card">Total Users: {totalUsers}</div>
      <div className="card">Admins: {adminCount}</div>
    </div>
  );
}

// User List
function UserList({ users }) {
  return (
    <div className="list">
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.role}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
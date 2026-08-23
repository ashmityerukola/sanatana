import { NavLink } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { signOut } from '../lib/auth'

const links = [
  { to: '/', label: 'Home' },
  { to: '/scripture', label: 'Scripture' },
  { to: '/meditation', label: 'Meditation' },
  { to: '/yoga', label: 'Yoga' },
  { to: '/gratitude', label: 'Gratitude' },
  { to: '/journal', label: 'Journal' },
]

export function NavBar() {
  const { user } = useAuth()

  return (
    <nav className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
      <div className="flex gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              isActive ? 'font-medium text-stone-900' : 'text-stone-500 hover:text-stone-800'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      {user && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-stone-500">{user.email}</span>
          <button onClick={() => signOut()} className="text-stone-500 hover:text-stone-800">
            Sign out
          </button>
        </div>
      )}
    </nav>
  )
}

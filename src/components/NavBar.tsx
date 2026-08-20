import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/scripture', label: 'Scripture' },
  { to: '/meditation', label: 'Meditation' },
  { to: '/yoga', label: 'Yoga' },
  { to: '/gratitude', label: 'Gratitude' },
  { to: '/journal', label: 'Journal' },
]

export function NavBar() {
  return (
    <nav className="flex gap-4 border-b border-stone-200 px-6 py-4">
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
    </nav>
  )
}

import { NavLink } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { signOut } from '../lib/auth'

const links = [
  { to: '/scripture', label: 'Scripture' },
  { to: '/meditation', label: 'Meditation' },
  { to: '/yoga', label: 'Yoga' },
  { to: '/gratitude', label: 'Gratitude' },
  { to: '/journal', label: 'Journal' },
]

export function NavBar() {
  const { user } = useAuth()

  return (
    <nav className="sticky top-0 z-10 border-b border-border bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <NavLink to="/" end className="font-serif text-lg text-ink">
            Sanatana
          </NavLink>
          <div className="hidden gap-5 text-sm sm:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'font-medium text-accent' : 'text-muted hover:text-ink'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted sm:inline">{user.email}</span>
            <button onClick={() => signOut()} className="text-muted hover:text-ink">
              Sign out
            </button>
          </div>
        )}
      </div>
      {/* Nav links repeated below the fold on small screens, since the row above hides them at `sm` */}
      <div className="mx-auto flex max-w-3xl gap-5 overflow-x-auto px-6 pb-3 text-sm sm:hidden">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'whitespace-nowrap font-medium text-accent' : 'whitespace-nowrap text-muted hover:text-ink'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

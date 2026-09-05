import { Navigate, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import Spinner from '../../components/ui/Spinner'
import { useAuth } from '../../hooks/useAuth'
import AdminLayout from './AdminLayout'
import DashboardPage from './DashboardPage'
import AdminProgramsPage from './AdminProgramsPage'
import AdminTrainersPage from './AdminTrainersPage'
import AdminMembershipsPage from './AdminMembershipsPage'
import AdminClassesPage from './AdminClassesPage'
import AdminGalleryPage from './AdminGalleryPage'
import AdminTestimonialsPage from './AdminTestimonialsPage'
import AdminFaqsPage from './AdminFaqsPage'
import AdminMessagesPage from './AdminMessagesPage'
import AdminSettingsPage from './AdminSettingsPage'
import NotFoundPage from '../NotFoundPage'

function AdminGate({ status, children }) {
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-steel">
        <Spinner className="h-6 w-6" />
      </div>
    )
  }

  if (status === 'admin') return children

  if (status === 'member') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center">
        <ShieldAlert size={40} className="text-red-400" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-white">Access denied</h1>
        <p className="mt-2 max-w-sm text-sm text-steel">
          Your account is signed in, but this profile does not have the admin role.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md border border-ink-line px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-white hover:border-accent"
        >
          Back to website
        </Link>
      </div>
    )
  }

  return <Navigate to="/admin/login" replace />
}

export default function AdminApp() {
  const { status } = useAuth()

  return (
    <AdminGate status={status}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="programs" element={<AdminProgramsPage />} />
          <Route path="trainers" element={<AdminTrainersPage />} />
          <Route path="memberships" element={<AdminMembershipsPage />} />
          <Route path="classes" element={<AdminClassesPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
          <Route path="faqs" element={<AdminFaqsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AdminGate>
  )
}

import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import TrainersPage from './pages/TrainersPage'
import TrainerDetailPage from './pages/TrainerDetailPage'
import MembershipPage from './pages/MembershipPage'
import ContactPage from './pages/ContactPage'
import SchedulePage from './pages/SchedulePage'
import GalleryPage from './pages/GalleryPage'
import FaqPage from './pages/FaqPage'
import NotFoundPage from './pages/NotFoundPage'
import Spinner from './components/ui/Spinner'

const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-ink">
          <Spinner className="h-6 w-6" />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/trainers/:slug" element={<TrainerDetailPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/classes" element={<Navigate to="/schedule" replace />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Suspense>
  )
}

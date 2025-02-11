import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Settings from './pages/settings/Settings'
import './App.css'
import { DocumentProvider } from './context/DocumentContext'
import DocumentUpload from './component/documentUpload/DocumentUpload'
import AssignDocument from './component/assignDocument/AssignDocument'

function App() {

  return (
    <>
      <DocumentProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/upload" element={<DocumentUpload />} />
              <Route path="/assign" element={<AssignDocument />} />
            </Routes>
          </MainLayout>
        </Router>
      </DocumentProvider>
    </>

  )
}

export default App

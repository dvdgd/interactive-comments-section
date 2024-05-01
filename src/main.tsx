import React from 'react'
import ReactDOM from 'react-dom/client'
import { CommentsSection } from './CommentsSection/CommentsSection.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CommentsSection />
  </React.StrictMode>,
)

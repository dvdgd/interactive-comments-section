import './main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { CommentsSection } from './CommentsSection/CommentsSection.tsx'
import { CommentsProvider } from './shared/context/CommentsContext.tsx'
import { UserProvider } from './shared/context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <CommentsProvider>
        <CommentsSection />
      </CommentsProvider >
    </UserProvider>
  </React.StrictMode>,
)

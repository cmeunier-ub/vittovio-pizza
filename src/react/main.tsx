import "./global/css/style.css"

import { createRoot } from 'react-dom/client'
import { Application } from './application/application'

createRoot(document.getElementById('root')!).render(
  <Application />,
)

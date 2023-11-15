import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProviders'
import getCurrentUser from './actions/getCurrentUser'
import TaskCreationModal from './components/modals/TaskCreationModal'
import TaskEditionModal from './components/modals/TaskEditionModal'
import TaskDeleteModal from './components/modals/TaskDeleteModal'
import ClientOnly from './components/ClientOnly'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tasks App',
  description: 'Simple tasks app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <TaskCreationModal />
          <TaskEditionModal />
          <TaskDeleteModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}

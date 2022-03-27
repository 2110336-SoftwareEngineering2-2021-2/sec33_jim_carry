import { BlitzPage, Link, Routes, useQuery } from 'blitz'
import { Suspense } from 'react'

import { AdminHistoryView } from 'app/admin/components/AdminHistoryView'
import { Button } from 'app/core/components/Button'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

const AdminTransactionHistory: BlitzPage = () => {
  return (
    <div>
      <TopBar title="Payment History" largeTitle />
      <Suspense fallback={<Spinner />}>
        <AdminHistoryView />
      </Suspense>
    </div>
  )
}

setupAuthRedirect(AdminTransactionHistory)
setupLayout(AdminTransactionHistory)
export default AdminTransactionHistory

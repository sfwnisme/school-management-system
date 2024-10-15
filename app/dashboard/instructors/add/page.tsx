import Button from '@/components/ui/button'
// import InstructorCreateForm from '@/components/ui/instructors/instructor-create-form'
import Title from '@/components/ui/title'
import React from 'react'
import InstructorCreateForm from './instructor-create-form'
import { getAllDepartments } from '@/lib/actions'
import { IClientResponse, IDepartment } from '@/definitions'

export default async function page() {
  const departments = await getAllDepartments() as IClientResponse<IDepartment[]>

  return (
    <div>
      <Title title="Add instructor">
        <Button tag="link" href="/dashboard/instructors">
          instructors
        </Button>
      </Title>
      <InstructorCreateForm departments={departments} />
    </div>
  )
}

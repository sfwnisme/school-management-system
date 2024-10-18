import Button from '@/components/ui/button'
// import DepartmentCreateForm from '@/components/ui/departments/department-create-form'
import Title from '@/components/ui/title'
import React from 'react'
import DepartmentCreateForm from './department-create-form'
import { getAllInstructors } from '@/lib/actions'
import { IClientResponse, IInstructor } from '@/definitions'

export default async function page() {
  const instructors = await getAllInstructors() as IClientResponse<IInstructor[]>

  return (
    <div>
      <Title title="Add department">
        <Button href="/dashboard/departments">
          departments
        </Button>
      </Title>
      <DepartmentCreateForm instructors={instructors} />
    </div>
  )
}

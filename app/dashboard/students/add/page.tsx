import Button from '@/components/ui/button'
import Title from '@/components/ui/title'
import { IClientResponse, IDepartment } from '@/definitions'
import { getAllDepartments } from '@/lib/actions'
import React from 'react'
import StudentCreateForm from './student-create-form'

export default async function page() {
  const departments = await getAllDepartments() as IClientResponse<IDepartment[]>

  return (
    <div>
      <Title title="Add student">
        <Button href="/dashboard/students">
          students
        </Button>
      </Title>
      <StudentCreateForm departments={departments} />
    </div>
  )
}

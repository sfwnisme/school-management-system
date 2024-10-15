import Button from '@/components/ui/button'
import Title from '@/components/ui/title'
import { IClientResponse, IDepartment, IInstructor } from '@/definitions'
import { getAllInstructors, getDepartmentById, getInstructorById } from '@/lib/actions'
import React from 'react'
import DepartmentUpdateForm from '../department-update-form'
// import { DepartmentUpdateForm } from './department-update-form'

type Props = {
  params: { id: number }
}

export default async function page(props: Props) {
  const id = Number(props.params.id)
  const department = await getDepartmentById(id) as IClientResponse<IDepartment>
  const instructors = await getAllInstructors() as IClientResponse<IInstructor[]>
  console.log(department)
  return (
    <div>
      <Title title="Update Department">
        <Button tag="link" href="/dashboard/departments" value="Departments" />
      </Title>
      <DepartmentUpdateForm instructors={instructors} department={department} />
    </div>
  )
}

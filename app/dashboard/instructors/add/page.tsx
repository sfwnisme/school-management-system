import Button from '@/components/ui/button'
import InstructorCreateForm from '@/components/ui/instructors/instructor-create-form'
import Title from '@/components/ui/title'
import React from 'react'

export default function page() {
  return (
    <div>
      <Title title="Add instructor">
        <Button tag="link" href="/dashboard/instructors">
          instructors
        </Button>
      </Title>
      <InstructorCreateForm />
    </div>
  )
}

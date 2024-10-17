import Button from '@/components/ui/button'
import Title from '@/components/ui/title'
import React from 'react'
import SubjectCreateForm from './subject-create-form'

export default function page() {
  return (
    <div>
      <Title title="Add subject">
        <Button href="/dashboard/subjects">
          subjects
        </Button>
      </Title>
      <SubjectCreateForm />
    </div>
  )
}

'use client';

import useTaskFilter from '@/hooks/taskFilter/use-taskFilter';
import React from 'react'
import { FormProvider } from 'react-hook-form';

type Props = {
  children: React.ReactNode
}

const TaskFilterFormProvider = ({children}: Props) => {
  const {methods, onHandleSubmit} = useTaskFilter()

  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit} className='h-full'>
        {children}
      </form>
    </FormProvider>
  )
}

export default TaskFilterFormProvider
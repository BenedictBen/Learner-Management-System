import React from 'react'
import VerticalTimeline from './VerticalTimeLine'
import RegisterForms from './RegisterCourseForms'

const RegisterCourse = () => {
  return (
    <div>
        <div className='flex flex-col md:flex-row items-center justify-center py-12 md:gap-12'>
            <div className='w-full md:w-1/3  flex items-center justify-center'>
                <VerticalTimeline/>
            </div>
            <div className='w-full md:w-1/3'>
                <RegisterForms/>
            </div>
        </div>
    </div>
  )
}

export default RegisterCourse
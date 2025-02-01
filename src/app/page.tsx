import React from 'react'
import LearnerPage from './(auth)/learner/page'
import {Box,Text} from '@chakra-ui/react'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Platform</h1>
      <div className="flex items-center justify-center flex-col">
        <Link href="/admin" className="admin-link">
          Go to Admin Portal
        </Link>
        <Link href="/learner" className="learner-link">
          Go to Learner Portal
        </Link>
      </div>
    </div>
  )
}

export default HomePage
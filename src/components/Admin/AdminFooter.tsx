import React from 'react'
import { BrandLinks } from './BrandLinks'

const AdminFooter = () => {
  return (
    <div className='block dark:bg-black md:hidden'>
      <footer className="mt-auto p-4 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} - G-client. All rights reserved.
      </p>
      <div>
        <BrandLinks />
        <p>By Benedict Baah</p>
      </div>
    </footer>
    </div>
  )
}

export default AdminFooter
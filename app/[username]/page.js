import React from 'react'

const username = ({params}) => {
  return (
    <div className='text-white'>
      {params.username}
    </div>
  )
}

export default username

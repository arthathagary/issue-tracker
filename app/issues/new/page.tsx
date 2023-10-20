"use client"

import { TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl'>
        <TextField.Root>
            <TextField.Input placeholder='Enter Issue title'/>
        </TextField.Root>
    </div>
  )
}

export default NewIssuePage
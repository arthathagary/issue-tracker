"use client"

import { ErrorMessage, Spinner } from '@/app/components/index';
import { createIssueSchema } from '@/app/validationScemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(()=>import ('react-simplemde-editor'),{ssr:false})

type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
    issue? : Issue
}
const IssueForm = ({issue}:Props) => {
    const router = useRouter();
    const {register,control,handleSubmit,formState:{errors}} = useForm<IssueFormData>({
        resolver:zodResolver(createIssueSchema)
    });
    const [error,setError] = useState("")
    const [submitting,setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async(data)=>{
        try {
            setSubmitting(true);
            await axios.post('/api/issues',data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError("Unexpected Error Occured");
        }
    })
  return (
    <div className='max-w-xl'>
        {error && <Callout.Root color="red" role="alert" className='mb-5'>
  <Callout.Text>
   {error}
  </Callout.Text>
</Callout.Root>}
    <form className=' space-y-3'
    onSubmit={onSubmit}
    >
        <TextField.Root>
            <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')}/>
        </TextField.Root>
       <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
        name='description' 
        defaultValue={issue?.description}
        control={control}
        render={({field})=> <SimpleMDE placeholder='Description'  {...field}/>}
        />
     <ErrorMessage>{errors.description?.message}</ErrorMessage>
        
        <Button disabled={submitting}>Submit New Issue {submitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default IssueForm
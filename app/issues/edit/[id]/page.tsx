import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { Issue } from '@prisma/client'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';

interface Props{
    params : { id:string};

}

const EditIssueDetails = async ({params}:Props) => {
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })

    if(!issue) notFound()

  return (
    <div>
        <IssueForm issue={issue}/>
    </div>
  )
}

export default EditIssueDetails
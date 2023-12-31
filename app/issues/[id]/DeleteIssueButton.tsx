"use client";
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '@/app/components';

const DeleteIssueButton = ({issueId}:{issueId:number}) => {
    const router = useRouter();
    const [deleting,setDeletiong]=useState(false);
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
    <Button color='red' disabled={deleting}>
        <TrashIcon />Delete Issue
        {deleting && <Spinner />}
        </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>
                Are you sure want to delete this issue? This action cannot be undone.
            </AlertDialog.Description>
        
        <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button  variant="solid" color="red" onClick={async()=>{
            try {
                setDeletiong(true);
                await axios.delete('/api/issues/'+issueId);
                router.push('/issues');
                router.refresh();
            } catch (error) {
                setDeletiong(false);
                console.log(error);
            }
        }}>
          Delete Issue
         
        </Button>
      </AlertDialog.Action>
    </Flex>
    </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
"use client"
import { Issue, User } from '@prisma/client'
import {Select} from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'


const AssigneeSelect = ({issue}:{issue:Issue}) => {
    const [users,setUsers] = useState<User[]>([]);
    useEffect(()=>{
        const fetchUsers = async ()=>{
            const {data} = await axios.get<User[]>('/api/users');
            setUsers(data);
        }

        fetchUsers();
    },[])
  return (
    <Select.Root
    defaultValue={issue.assignedToUserId || ""}
     onValueChange={(userId)=>{ 
        axios.patch('/api/issues/'+issue.id,{assignedToUserId:userId || null})
    }}>
        <Select.Trigger placeholder='Assign...' />
            <Select.Content>
            <Select.Group>
                <Select.Label>
                    Suggestions
                </Select.Label>
                <Select.Item value="">Unassigned</Select.Item>
                {users?.map((user)=> (
                <Select.Item value={user.id} key={user.id}>
                    {user.name}
                </Select.Item>
                ))}
            </Select.Group>
            </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
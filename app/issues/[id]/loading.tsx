import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card,Text, Box } from '@radix-ui/themes'
import React from 'react'
import Markdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>
    <Heading><Skeleton/></Heading>
    <Flex gap="3" my="2">
    <Skeleton width="5rem" />
    <Text><Skeleton width="8rem" /></Text>
    </Flex>
    <Card className='prose' mt="4">
    <Skeleton count={5}/> 
    </Card>
    
     </Box>
  )
}

export default LoadingIssueDetailsPage
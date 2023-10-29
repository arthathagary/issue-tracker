import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueFilter from './list/IssueFilter'

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueFilter />
      <Button><Link href="/issues/new">New Issue</Link></Button>
      </Flex>
  )
}

export default IssueActions
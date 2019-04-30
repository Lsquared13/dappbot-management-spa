import React, { FunctionComponent, Fragment } from 'react';
import Button from './ui/Button';
import Text from './ui/Text';

interface SubmissionProps {
  submit : ()=>void
  response: string
}

export const Submission:FunctionComponent<SubmissionProps> = (props)=>{
  const { submit, response } = props;
  return (
    <Fragment>
      <Button onClick={submit} block>Submit</Button>
      <Text>{response}</Text>
    </Fragment>
  )
}

export default Submission;
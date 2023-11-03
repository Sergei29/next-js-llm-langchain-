// start here
import React from 'react'

import InProgressDisplay from '@/components/InProgressDisplay'

interface IProps {
  [x: string]: any
}

const Memory = ({}: IProps): JSX.Element => {
  return <InProgressDisplay featureName="Memory" />
}

export default Memory

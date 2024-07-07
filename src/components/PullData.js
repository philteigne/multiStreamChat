import React from 'react';

const PullData = (data) => {
  return (
    <React.Fragment>
      <h1>Pull Data</h1>
      <p>{data.totalRequestCount}</p>
      <p>{data.totalPullCount}</p>
      <p>{data.totalMessageCount}</p>
    </React.Fragment>
  )
}

export default PullData
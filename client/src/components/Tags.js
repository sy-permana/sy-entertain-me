import React from 'react'

export default (props) => {
  let flexDir = 'column'
  if (props.row) flexDir = 'row'

  return (
    <div style={{
      display: 'flex',
      flexDirection: flexDir,
      justifyContent: 'right'
    }}>
      {
        props.data.map((tag, i) => (
          <span className="tags" key={i}>{ tag }</span>
        ))
      }
    </div>
  )
}

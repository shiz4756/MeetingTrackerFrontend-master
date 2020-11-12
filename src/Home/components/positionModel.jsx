import React, { useState } from 'react'
import { Modal, Input } from 'antd'

const PositionModel = (props) => {
  const [positionName, setPositionName] = useState('')
  const [positionId, setPositionId] = useState('')
  const [department, setDepartment] = useState('')

  return (
    <Modal
      title="Position Information"
      visible={props.visible}
      onOk={() => {
        const data = {
          positionName,
          positionId,
          department,
        }
        props.onOK('position', data)
      }}
      onCancel={() => props.onCancel('position')}
    >
      <p>
        <Input
          addonBefore="Position Name"
          defaultValue={positionName}
          onChange={(e) => setPositionName(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Position ID"
          defaultValue={positionId}
          onChange={(e) => setPositionId(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Department"
          defaultValue={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </p>
    </Modal>
  )
}

export default PositionModel

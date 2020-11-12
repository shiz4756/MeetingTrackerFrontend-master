import React, { useState } from 'react'
import { Modal, Table } from 'antd'
const columns = [
	{
		title: 'Candidate Name',
		dataIndex: 'candidateName',
		key: 'candidateName',
	},
	{
		title: 'Participants',
		dataIndex: 'participants',
		key: 'participants',
	},
	{
		title: 'Start Time',
		dataIndex: 'startTime',
		key: 'startTime',
	},
	{
		title: 'End Time',
		dataIndex: 'endTime',
		key: 'endTime',
	},
	{
		title: 'Location',
		dataIndex: 'location',
		key: 'location',
	},
]

const ViewModel = (props) => {
	const { text = 'View Meeting Schedule', data, visible = false } = props

	return (
		<Modal
			title={text}
      visible={visible}
      onCancel={props.onCancel}
			width={700}
			footer={null}
		>
			<Table pagination={false} dataSource={data} columns={columns} />
		</Modal>
	)
}

export default ViewModel

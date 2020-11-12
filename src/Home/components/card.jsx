import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button, Table, Popconfirm, message } from 'antd'
import UserInfoModel from './userinfoModel'

class Cards extends React.Component {
  state = {
    visible: false,
    type: '',
    userData: {},
    list: [],
  }

  columns = [
    {
      title: 'Candidate Name',
      dataIndex: 'candidateName',
      key: 'candidateName',
    },
    {
      title: 'Email',
      dataIndex: 'candidateEmail',
      key: 'candidateEmail',
    },
    {
      title: 'Uploaded Docs',
      dataIndex: 'fileList',
      key: 'fileList',
      render: (text, record) =>
        record.fileList.map((item, index) => (
          <p>
            {index + 1}. {item.fileName}
          </p>
        )),
    },
    {
      title: 'Meeting Schedule',
      dataIndex: 'meetingSchedule',
      key: 'meetingSchedule',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              const { history, index } = this.props
              history.push({
                pathname: '/schedule',
                search: `?name=${
                  record.candidateName
                }&id=${`${index}-${record.index}`}`,
              })
            }}
          >
            Create
          </Button>
          <Button
            type="link"
            onClick={() => {
              const { index } = this.props
              this.props.onView(index, record.index)
            }}
          >
            View
          </Button>
          <Button
            type="link"
            onClick={() => {
              const { history, index } = this.props
              history.push({
                pathname: '/schedule',
                search: `?name=${
                  record.candidateName
                }&type=edit&id=${`${index}-${record.index}`}`,
              })
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure delete this schedule?"
            onConfirm={() => this.onDeleteSchedule(record)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              this.setState({
                type: 'edit',
                userData: record,
                visible: true,
              })
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this candidate?"
            onConfirm={() => this.onDeleteAction(record)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ]

  onDeleteAction = (data) => {
    const { index } = this.props
    const { list } = this.state
    const newList = list.slice(0)
    let sort
    newList.forEach((item, index) => {
      if (item.index === data.index) {
        sort = index
        window.sessionStorage.removeItem(`${index}-${item.index}`)
      }
    })
    newList.splice(sort, 1)
    this.props.onRemove(index, sort)
    this.setState({ list: newList })
    message.success('Delete Success!')
  }

  onDeleteSchedule = (data) => {
    const { index } = this.props
    window.sessionStorage.removeItem(`${index}-${data.index}`)
    message.success('Delete Success!')
    window.location.reload()
  }

  onOpen = () => {
    this.setState({ visible: true })
  }

  onCancel = () => {
    this.setState({ visible: false, userData: {}, type: '' })
  }

  onOK = (data) => {
    const { index } = this.props
    this.props.onOK('users', data, index)
    this.setState({ visible: false, userData: {}, type: '' })
  }

  componentDidMount() {
    const { list } = this.props
    if (list && list.length) {
      this.setState({ list })
    }
  }

  render() {
    const { positionName, positionId, department } = this.props
    const { visible, type, userData, list } = this.state
    return (
      <Card
        type="inner"
        title={
          <div>
            <p>Meeting Scheduling for the Position</p>
            <p>
              Name: {positionName || 'Lecturer'}; ID: {positionId || 2987987};
              Department:{department || 'Phy'}
            </p>
          </div>
        }
        extra={
          <span>
            <Button type="link" onClick={this.onOpen}>
              Add new Candidate
            </Button>
            <Button
              type="link"
              onClick={() => {
                const { index } = this.props
                const { list } = this.state
                const arr = []
                list.forEach((item) => {
                  arr.push(item.index)
                })
                this.props.onView(index, 0, arr)
              }}
            >
              View All Meeting Schedules
            </Button>
          </span>
        }
      >
        {list.length ? (
          <Table pagination={false} dataSource={list} columns={this.columns} />
        ) : null}
        {visible && (
          <UserInfoModel
            visible={visible}
            type={type}
            data={userData}
            onCancel={this.onCancel}
            onOK={this.onOK}
          />
        )}
      </Card>
    )
  }
}

export default withRouter(Cards)

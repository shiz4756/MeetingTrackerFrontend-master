import React from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'
import Cards from './components/card'
import PositionModel from './components/positionModel'
import ViewModel from './components/viewModel'
import './style.css'

class Home extends React.Component {
  state = {
    modelStatus: {
      position: false,
      view: false,
    },
    dataStore: {
      position: [],
      users: [],
    },
    view: [],
  }

  onOpen = () => {
    const { modelStatus } = this.state
    this.setState({ modelStatus: { ...modelStatus, position: true } })
  }

  onOK = (type, data, index) => {
    const { dataStore, modelStatus } = this.state
    switch (type) {
      case 'position':
        const i = dataStore.position.length
        data.index = i
        const newPosition = dataStore.position.concat([data])
        this.setState({
          dataStore: {
            ...dataStore,
            position: newPosition,
            users: [...dataStore.users, []],
          },
          modelStatus: { ...modelStatus, position: false },
        })
        window.sessionStorage.setItem('position', JSON.stringify(newPosition))
        break
      case 'users':
        const { users } = dataStore
        const len = users[index] ? users[index].length : 0
        data.index = len
        const newUsers = users[index]
          ? users[index].concat([data])
          : [].concat([data])
        users.splice(index, 1, newUsers)
        this.setState({
          dataStore: {
            ...dataStore,
            users,
          },
        })
        window.sessionStorage.setItem('users', JSON.stringify(users))
      default:
        break
    }

    window.location.reload()
  }

  onCancel = (type) => {
    const { modelStatus } = this.state
    switch (type) {
      case 'position':
        this.setState({ modelStatus: { ...modelStatus, position: false } })
        break
      default:
        this.setState({ modelStatus: { ...modelStatus, view: false } })
        break
    }
  }

  onView = (index, sort, arr) => {
    const { modelStatus } = this.state
    if (!arr) {
      const sessionData = JSON.parse(
        window.sessionStorage.getItem(`${index}-${sort}`)
      )
      this.setState({
        view: sessionData,
        modelStatus: { ...modelStatus, view: true },
      })
      return
    }
    let data = []
    for (let i = 0; i < arr.length; i++) {
      const sessionData = JSON.parse(
        window.sessionStorage.getItem(`${index}-${arr[i]}`)
      )
      if (sessionData) {
        data = data.concat(sessionData)
      }
    }
    this.setState({
      view: data,
      modelStatus: { ...modelStatus, view: true },
    })
  }

  onRemove = (index, sort) => {
    const { dataStore } = this.state
    const newList = dataStore.users.slice(0)
    const arr = newList[index]
    arr.splice(sort, 1)
    newList[index] = arr
    window.sessionStorage.setItem('users', JSON.stringify(newList))
    this.setState({
      dataStore: {
        ...dataStore,
        users: newList,
      },
    })
  }

  onNavCandidate = () => {
    this.props.history.push('/candidate')
  }

  onNavParticipant = () => {
    this.props.history.push('/participant')
  }

  componentDidMount() {
    const positionData = window.sessionStorage.getItem('position')
    const usersData = window.sessionStorage.getItem('users')
    if (positionData || usersData) {
      const { dataStore } = this.state
      this.setState({
        dataStore: {
          ...dataStore,
          position: positionData ? JSON.parse(positionData) : [],
          users: usersData ? JSON.parse(usersData) : [],
        },
      })
    }
  }

  render() {
    const {
      modelStatus,
      dataStore: { position, users },
      view,
    } = this.state
    return (
      <div className="home">
        <p>
          <Button
            type="primary"
            onClick={this.onOpen}
            style={{ marginRight: '16px' }}
          >
            Add a position
          </Button>
          <Button
            type="primary"
            style={{ marginRight: '16px' }}
            onClick={this.onNavCandidate}
          >
            Go to candidate
          </Button>
          <Button type="primary" onClick={this.onNavParticipant}>
            Go to participant
          </Button>
        </p>
        {position.length
          ? position.map((item, index) => (
              <Cards
                key={index}
                {...item}
                list={users[index]}
                onOK={this.onOK}
                onRemove={this.onRemove}
                onView={this.onView}
              />
            ))
          : null}
        {modelStatus.position && (
          <PositionModel
            visible={modelStatus.position}
            onOK={this.onOK}
            onCancel={this.onCancel}
          />
        )}
        {modelStatus.view && (
          <ViewModel
            visible={modelStatus.view}
            data={view}
            onCancel={this.onCancel}
          />
        )}
      </div>
    )
  }
}

export default withRouter(Home)

import React from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom'
// import PropTypes from 'prop-types'
import routes from 'routes'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { getName } from '$redux/actions'
// import axios from './api/axios'
// import { Config } from './config'
import './assets/index.scss'
class App extends React.Component {
  // constructor () {
  // console.log(props, 'ppp')
  // super(props)
  //   this.state = {
  //     role: 'index'
  //   }
  // }
  /**
   * 获取登录信息
   */
  // initLogin () {
  //   this.setState({
  //     role: this.props.data.getname.userName
  //   })
  //   // CommonApi.registerServer2Cas()
  //   // axios.get(Config.REGISTER_SERVER_2_CAS)
  //   // this.props.login()
  // }
  // componentWillReceiveProps (nextProps) {
  //   this.initLogin(nextProps)
  // }
  // componentWillMount () {
  //   this.initLogin()
  // }

  render () {
    let y = false
    if (y) {
      return (
        <div className='loading' >
          <div className='loading-center'>
            <div className='loading-center-absolute'>
              <div className='object' />
              <div className='object' />
              <div className='object' />
              <div className='object' />
              <div className='object' />
              <div className='object' />
              <div className='object' />
              <div className='object' />
              <div className='object' />
              <div className='object' />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='App'>
        <Router>
          {
            renderRoutes(routes)
          }
        </Router>
      </div>
    )
  }
}

// App.propTypes = {
//   // login: PropTypes.func,
//   loginLoading: PropTypes.bool,
//   data: PropTypes.object
// }

// const mapStateToProps = state => ({
//   data: state,
//   loginLoading: state.login.loginLoading
// })

// const mapDispatchToProps = dispatch => ({
//   getName: bindActionCreators(getName, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)
export default App

import {connect} from 'react-redux'

import {createAnonymousSession} from '../store/session/session.actions'
import {getMe} from '../store/user/user.actions'

import HomePage from '../components/HomePage'

const mapStateToProps = ({entities, session, user}) => ({
  session,
  user: {...user, me: entities.users[user.me]}
})

const mapDispatchToProps = {
  signUpAnonymously: createAnonymousSession,
  getMe
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)


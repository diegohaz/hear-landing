import React from 'react'
import styles from './Header.scss'

import logo from './logo.svg'

const Header = () => (
  <div className={styles.header}>
    <div className={styles.logo}>
      <a href='#'><img src={logo} alt='Logo' /></a>
    </div>
  </div>
)

export default Header

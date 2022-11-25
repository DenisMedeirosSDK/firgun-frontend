import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

import styles from './styles.module.scss'
export function DefaultLayout(){
  return (
    <div className={styles.container}>
      <header>
        <Header/>
      </header>
      <div>
      <Outlet/>
      </div>
    </div>
  )
}
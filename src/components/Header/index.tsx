import styles from './styles.module.scss'

export function Header(){
  return (
    <div className={styles.container}>
      <a href='/' className={styles.logo} >Firgun</a>

      <nav className={styles.nav}>
        <a href="/contato">Contato</a>
      </nav>
    </div>
  )
}

import styles from './menuLateral.module.css'
import LinksMenus from '../LinksMenus'
export default function MenuLateral() {
    const menus = LinksMenus


    return (
        <nav className={styles.MenuLateral}>
            {menus.map((e) => (
                <li key={e.portugues}>{e.portugues}</li>
            ))}
          

        </nav>
    )
};

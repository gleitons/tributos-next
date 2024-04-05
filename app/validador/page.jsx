import styles from './validador.module.css'
export default function Validador() {
    const url = process.env.LINK
   
    return (
        <div className={styles.ifram} >
            <iframe src={url} width="100%" frameborder="0"></iframe>
        </div>
    )
 };

import styles from './index.module.scss'

const OrderPhoto = ({ photos }) => {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        <img className={styles.image} src={photos[0]} alt="" />
      </div>
      {photos.length > 1 && (
        <div className={styles.quantity}>+{photos.length - 1}</div>
      )}
    </div>
  )
}

export default OrderPhoto

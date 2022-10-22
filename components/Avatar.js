import styles from '../styles/components/Avatar.module.css';
import Image from 'next/image';

const Avatar = ({ src = '', alt = '' }) => (
  <div className={styles.avatar}>
    {src ? <Image src={src} alt={alt} height={50} width={50} /> : null}
  </div>
);

export default Avatar;

// components/ImageDisplay.js

import Image from 'next/image';
import styles from '../styles/ImageDisplay.module.css';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={imageUrl} alt="I Spy Image" className={styles.spyImage} />
    </div>
  );
};

export default ImageDisplay;

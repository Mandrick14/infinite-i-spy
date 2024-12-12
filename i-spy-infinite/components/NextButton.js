// components/NextButton.js

import styles from '../styles/NextButton.module.css';

const NextButton = ({ onClick }) => {
  return (
    <button className={styles.nextButton} onClick={onClick}>
      Next
    </button>
  );
};

export default NextButton;

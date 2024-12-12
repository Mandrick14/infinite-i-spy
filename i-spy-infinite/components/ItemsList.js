// components/ItemsList.js

import styles from '../styles/ItemsList.module.css';

const ItemsList = ({ items }) => {
  return (
    <div className={styles.itemsContainer}>
      <h2>Find these items:</h2>
      <ul className={styles.itemsList}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;

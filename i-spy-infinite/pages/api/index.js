// pages/index.js

import { useState, useEffect } from 'react';
import ImageDisplay from '../components/ImageDisplay';
import ItemsList from '../components/ItemsList';
import NextButton from '../components/NextButton';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const prompt = 'A vibrant and busy scene in a park with various activities and objects.';

  const loadIspyPage = async () => {
    setLoading(true);
    setError('');

    try {
      // Generate Image
      const imageResponse = await axios.post('/api/generate-image', { prompt });
      const { imageUrl } = imageResponse.data;
      setImageUrl(imageUrl);

      // Generate Items
      const itemsResponse = await axios.post('/api/generate-items', { imageDescription: prompt });
      const { items } = itemsResponse.data;
      setItems(items);
    } catch (err) {
      console.error(err);
      setError('Failed to load I Spy page. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIspyPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>I Spy Infinite</h1>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <ImageDisplay imageUrl={imageUrl} />
          <ItemsList items={items} />
          <NextButton onClick={loadIspyPage} />
        </>
      )}
    </div>
  );
}

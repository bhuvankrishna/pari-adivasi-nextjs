import { useState, useEffect } from 'react';
import { fetchData, ResponseData } from '../api/fetch';
import styles from './Paintings.module.css';
import Link from 'next/link';
import Header from '@/components/header'
import Footer from '@/components/footer';


interface Props {
  child: string;
}

function Paintings({ child }: Props) {
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const BASE_URL = 'https://beta.ruralindiaonline.org/api';

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error:any) {
        setError(error);
      }
    };

    fetchDataAsync();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header></Header>
      <div className={styles.paintingsMainContent} id="paintings-main">
        {data.data.map((item) => (
          <div key={item.id} className={styles.paintingsCard}>
            <div className={styles.paintingsFeaturedImage}>
            <Link href={`/paintings/${item.id}`}>
                <img
                  src={BASE_URL+item.attributes.Painting.data.attributes.formats.small.url}
                  className="attachment-medium size-medium wp-post-image"
                  alt=""
                  width="300"
                  height="234"
                  decoding="async"
                  loading="lazy"
                />
              </Link>

            </div>
            <a>
              <img 
                className={styles.paintingsPainterImg} 
                src={BASE_URL+item.attributes.ChildPhoto.data.attributes.formats.thumbnail.url}
              />
            </a>
            <div className={styles.paintingsPainterName}>
              <h2 className={styles.entryTitle}>
                <a rel="bookmark">{item.attributes.Name}</a>
              </h2>
            </div>
          </div>

        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Paintings;

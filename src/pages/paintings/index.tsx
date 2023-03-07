import { useState, useEffect } from 'react';
import { fetchData, ResponseData } from '../api/fetch';
import styles from './Paintings.module.css';



interface Props {}
function MyComponent(props: Props) {
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const BASE_URL = 'https://beta.ruralindiaonline.org/api';

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error) {
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

    <div className={styles.paintingsMainContent} id="paintings-main">
      {data.data.map((item) => (
        <div key={item.id} className={styles.paintingsCard}>
          <div className={styles.paintingsFeaturedImage}>
            <a>
              <img
                src={BASE_URL+item.attributes.Painting.data.attributes.formats.small.url}
                className="attachment-medium size-medium wp-post-image"
                alt=""
                width="300"
                height="234"
                decoding="async"
                loading="lazy"
              />
            </a>

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
          {/* <h1>{item.attributes.Title}</h1>
          <p>{item.attributes.Name}</p>
          <p>{item.attributes.createdAt}</p>
          <p>{item.attributes.Painting.data.attributes.name}</p>
          <p>{item.attributes.Painting.data.attributes.formats.small.name}</p>
          <p>{item.attributes.Painting.data.attributes.formats.thumbnail.name}</p>
          <a href={item.attributes.VideoLink}>Video</a> */}
        </div>

      ))}
    </div>
  );
}

export default MyComponent;

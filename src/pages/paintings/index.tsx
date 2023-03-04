import { useState, useEffect } from 'react';
import { fetchData, ResponseData } from '../api/fetch';

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
    <div>
      {data.data.map((item) => (
        <div key={item.id}>
          <h1>{item.attributes.Title}</h1>
          <p>{item.attributes.Name}</p>
          <p>{item.attributes.createdAt}</p>
          <p>{item.attributes.Painting.data.attributes.name}</p>
          <p>{item.attributes.Painting.data.attributes.formats.small.name}</p>
          <p>{item.attributes.Painting.data.attributes.formats.thumbnail.name}</p>
          <img src={BASE_URL+item.attributes.Painting.data.attributes.formats.small.url}/>
          <img src={BASE_URL+item.attributes.ChildPhoto.data.attributes.formats.thumbnail.url}/>
          <a href={item.attributes.VideoLink}>Video</a>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;

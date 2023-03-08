import axios, { AxiosResponse } from 'axios';

interface DataItem {
  id: number,
  attributes: {
    Title: string,
    Name: string,
    Age: number,
    Class: number,
    School: string,
    Tribe: string,
    Village: string,
    GP: string,
    Block: string,
    District: string,
    State: string,
    Medium: string,
    Year: number,
    ProjectTeacher: string,
    Translation: string,
    publishedAt: any,
    VideoLink: string,
    Painting: {
      data: {
        id: number,
        attributes: {
          name: string,
          width: number,
          height: number,
          formats: {
            small: {
              name: string,
              url: string
            },
            thumbnail: {
              name: string,
              url: string
            },
          }
        }
      }
    }
    ChildPhoto: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              name: string,
              url: string
            }
          }
        }
      }
    }
  }
}

export interface ResponseData {
  data: DataItem[];
}

// const api_url = process.env.NEXT_PUBLIC_API_URL;
// const token = process.env.NEXT_PUBLIC_TOKEN;

export const fetchData = async (): Promise<ResponseData> => {
  const response: AxiosResponse<ResponseData> = await axios.get(`https://beta.ruralindiaonline.org/api/api/childrens-paintings?populate=deep&sort=Title`);
  return response.data;
};
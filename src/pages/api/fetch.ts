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
const headers = { Authorization: 'Bearer e6cac262860592af3ab95de2c732f124f6d0d70c67882ab3864e6a457489cb1ad252fce7848c46f8d775ad03fd3fb9652cfcf989dfb761658af7d97f1de144eeb7f5fb4ab9ec6e5fbc4137d74f14f29fcca90b7cec578ee0b58df9a0147941586e9626b6e007d0710140beed7dd9a2664807fb7077efa3d591b0253424d49f31' };

export const fetchData = async (): Promise<ResponseData> => {
  const response: AxiosResponse<ResponseData> = await axios.get(`https://beta.ruralindiaonline.org/api/api/childrens-paintings?populate=deep&sort=Title`, { headers });
  return response.data;
};
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface Child {
  
    id: number,
    attributes: {
      Name: string,
      Age: number,
      Class: number,
      School: string,
      Block: string,
      District: string,
      State: string,
      Tribe: string,
      Medium: string,
      Year: number,
      ProjectTeacher: string,
      Translation: string,
      VideoLink: string,
      Painting: {
        data: {
          id: number,
          attributes: {
            name: string,
            width: number,
            height: number,
            url: string,
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
    }
}


type ChildObjectPropsType = {child : Child | null; error : Error | null }
const BASE_URL = 'https://beta.ruralindiaonline.org/api';

export const getServerSideProps: GetServerSideProps = async (ctx: any) =>{
    const props:ChildObjectPropsType = {child:null, error:null}
      try {
        const response = await axios.get<{data: Child}>(BASE_URL+`/api/childrens-paintings/${ctx.query.child}?populate=deep`, { 
                                headers: { 
                                    Authorization: 'Bearer e6cac262860592af3ab95de2c732f124f6d0d70c67882ab3864e6a457489cb1ad252fce7848c46f8d775ad03fd3fb9652cfcf989dfb761658af7d97f1de144eeb7f5fb4ab9ec6e5fbc4137d74f14f29fcca90b7cec578ee0b58df9a0147941586e9626b6e007d0710140beed7dd9a2664807fb7077efa3d591b0253424d49f31' 
                                } 
                            });
        props.child = response.data?.data;
      } catch (error:any) {
        props.error=error.message;
    }
    return { props }
}


function ChildPage({child, error}:ChildObjectPropsType) {
  const router = useRouter();
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!child) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{child.attributes.Name}</div>
      <img
      src={BASE_URL+child.attributes.Painting.data.attributes.url}
      />
    </div>
  );
}

export default ChildPage;

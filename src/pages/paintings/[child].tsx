import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import styles from './Paintings.module.css';
import Footer from '../../components/footer';
import Header from '../../components/header';

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
      VideoID: string,
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
const VIDEOLINK1 = 'https://img.youtube.com/vi/'
const VIDEOLINK2 = '/0.jpg'

export const getServerSideProps: GetServerSideProps = async (ctx: any) =>{
    const props:ChildObjectPropsType = {child:null, error:null}
      try {
        const response = await axios.get<{data: Child}>(BASE_URL+`/api/childrens-paintings/${ctx.query.child}?populate=deep`);
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
      <Header></Header>
      <div className={styles.imageContainer}>
        <div className={styles.imageContent}>

          {/* Image and Video section */}
          
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img
                src={BASE_URL+child.attributes.Painting.data.attributes.url}
              />
            </div>
            <div className={styles.slideImage}>
              <div className={styles.img}>
                <img
                  src={BASE_URL+child.attributes.Painting.data.attributes.formats.thumbnail.url}
                />
              </div>
              <div className={styles.videoThumbnail}>
                <img src={VIDEOLINK1+child.attributes.VideoID+VIDEOLINK2} 
                />
              </div>
            </div>
          </div>

          {/* Description section */}

          <div className={styles.paintersDescription}>
            <ul className={styles.description__ul}>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Name: </b></h5>
                {child.attributes.Name}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Age: </b></h5>
                {child.attributes.Age}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Class: </b></h5>
                {child.attributes.Class}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>School: </b></h5>
                {child.attributes.School}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Block: </b></h5>
                {child.attributes.Block}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>District: </b></h5>
                {child.attributes.District}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>State: </b></h5>
                {child.attributes.State}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Tribe: </b></h5>
                {child.attributes.Tribe}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Medium: </b></h5>
                {child.attributes.Medium}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Date: </b></h5>
                {child.attributes.Year}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                <h5 className={styles.description__h5}><b>Project Teacher: </b></h5>
                {child.attributes.ProjectTeacher}
              </div>
            </li>
            <li className={styles.description__li}>
              <div className={styles.description}>
                {child.attributes.Translation}
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ChildPage;


      
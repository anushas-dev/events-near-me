import styles from '../styles/pages/Home.module.css';
import { useUserContext } from '../UserProvider';
import Head from 'next/head';
import Layout from '../components/Layout';
import withAuth from '../withAuth';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react';
import { TextField } from '@mui/material';
import Image from 'next/image';

const Home = (props) => {
  const { user } = useUserContext();
  const [inputText, setInputText] = useState("");

  const EVENTS_QUERY = gql`
    query listEvents {
      events (order_by: {event_date: asc}) {
        event_id
        event_name
        event_date
        event_location
        event_description
        event_link
        event_cover_image
      }
    }
  `
  const { loading, error, data } = useQuery(EVENTS_QUERY)
  var events_list = data?.events
  console.log(events_list)
  var el;


  if (error) {
    return <p>Something went wrong. Try to refresh the page.</p>
  }
  if (loading) {
    return null
  }

  return (
    <Layout>
      <Head>
        <title>Events Near Me</title>
      </Head>

      <div>
        <div className={styles.center}>
          <TextField
            id="standard-basic"
            variant="standard"
            width={70}
            label="Search For Events"
            value={inputText}
            color="primary"
            onChange={e => setInputText(e.target.value)}
          />
        </div>

        <br></br>
        <div className={styles.gridcontainer}>
          {events_list.filter((value) => {
            if (inputText == '') {
              return value
            }
            else if (value.event_name.toLowerCase().includes(inputText.toLowerCase()) || value.event_description.toLowerCase().includes(inputText.toLowerCase())) {
              return value
            }

          }).map((event) => (
            <div className={styles.griditem} key={event.event_id}>
              <div className={styles.card}>
                {event.event_cover_image ? <Image src={event.event_cover_image} height={190} width={250} /> : null}
                <strong><h2> {event.event_name} </h2></strong>
                <p > {event.event_description} </p>
                <p> Location:  {event.event_location} <br></br> Date: {event.event_date}</p>
                <p>  </p>
                <p><button className={styles['event-button']} ><Link href={event.event_link}><a target="_blank">Know More</a></Link></button></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Home);
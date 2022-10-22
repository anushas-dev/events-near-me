import styles from '../styles/pages/Profile.module.css';
import { useState } from 'react';
import { useUserContext } from '../UserProvider';
import Head from 'next/head';
import Layout from '../components/Layout';
import Input from '../components/Input';
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'


const UPDATE_EVENT_MUTATION = gql`
  mutation ($event_name: String!, $event_date: date!, $event_location: String!, $event_description: String!, $event_link: String!) {
    insert_events_one(object: { event_name: $event_name, event_date: $event_date, event_location: $event_location, event_description: $event_description, event_link: $event_link }) {
        event_name
        event_date
        event_location
        event_description
        event_link
             }
         }
    `
const CreateEvents = () => {
    const { user } = useUserContext();
    const router = useRouter();
    const [eventName, seteventName] = useState('');
    const [eventDate, seteventDate] = useState('');
    const [eventLocation, seteventLocation] = useState('');
    const [eventDescription, seteventDescription] = useState('');
    const [eventLink, seteventLink] = useState('');

    const iseventNameDirty = eventName !== '' ;
    const iseventDateDirty = eventDate !== '' ;
    const iseventLocationDirty = eventLocation !== '' ;
    const iseventDescription = eventDescription !== '' ;
    const iseventLink = eventLink !== '';
    const isProfileFormDirty = iseventNameDirty && iseventDateDirty && iseventLocationDirty || (iseventDescription || iseventLink);

    const [mutateEvent, { loading: updatingEvents }] = useMutation(UPDATE_EVENT_MUTATION)

    const createEvent = async (e) => {
        e.preventDefault()

        try {
            await mutateEvent({
                variables: {
                    event_name: `${eventName}`.trim(),
                    event_date: `${eventDate}`,
                    event_location: `${eventLocation}`.trim(),
                    event_description: `${eventDescription}`.trim(),
                    event_link: `${eventLink}`.trim(),
                }
            })
            toast.success('Updated successfully')
            router.reload(window.location.pathname)
        } catch (error) {
            toast.error('Unable to create event')
        }
    }

    return (
        <Layout>
            <Head>
                <title>Post New Event</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.info}>
                    <h2>New Event</h2>
                    <p>Add a new event with location, date, and details.</p>
                </div>

                <div className={styles.card}>
                    <form onSubmit={createEvent} className={styles.form}>
                        <div className={styles['form-fields']}>
                            <div className={styles['input-group']}>
                                <Input
                                    type="text"
                                    label="Event name"
                                    value={eventName}
                                    onChange={e => seteventName(e.target.value)}
                                    required
                                />
                                <Input
                                    type="Date"
                                    label="Event Date"
                                    id="date_timepicker"
                                    value={eventDate}
                                    onChange={e => seteventDate(e.target.value)}
                                    required
                                />
                            </div>
                            <Input
                                type="text"
                                label="Event Location"
                                value={eventLocation}
                                onChange={e => seteventLocation(e.target.value)}
                                required
                            />
                            <Input
                                type="text"
                                label="Event Description"
                                value={eventDescription}
                                onChange={e => seteventDescription(e.target.value)}
                                required
                            />
                            <Input
                                type="text"
                                label="Event Link"
                                value={eventLink}
                                onChange={e => seteventLink(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles['form-footer']}>
                            <button
                                type="submit"
                                disabled={!isProfileFormDirty}
                                className={styles.button}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreateEvents;

import { useEffect } from 'react';
import { useAuth } from '../../utility/hooks/authentication'; // Import the auth context
import { useTrips } from '../../utility/hooks/trips'; // Import the trips context

export default function Index() {
    const { user } = useAuth();
    const { getTrips } = useTrips();

    useEffect( () => {
        getTrips(
            async (value) => {
                console.log(value);
            }
        );
    }, []);

    return (
        <>
            <h1>WELCOME TO DASHBOARD, {user?.uid}</h1>
            <p>YOOYOYOYOYOYOYOOYOYO</p>
        </>
    )
}
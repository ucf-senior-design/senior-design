import { useEffect } from 'react';
import { useAuth } from '../../utility/hooks/authentication'; // Import the auth context

export default function Index() {
    const { user, getTrips} = useAuth();

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
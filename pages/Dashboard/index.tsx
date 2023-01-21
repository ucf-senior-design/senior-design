import { useAuth } from '../../utility/hooks/authentication'; // Import the auth context

export default function Index() {
    const { user } = useAuth();

    return (
        <>
            <h1>WELCOME TO DASHBOARD, {user?.uid}</h1>
            <p>YOOYOYOYOYOYOYOOYOYO</p>
        </>
    )
}
import Image from "next/image";
import { useAuth } from "../../utility/hooks/authentication";

export default function ThirdPartyAuth() {
    const {doGoogleLogin, doFacebookLogin} = useAuth();
    return (
        <Image src='/google_normal.svg' alt='Google' layout='fill' />
    )
}
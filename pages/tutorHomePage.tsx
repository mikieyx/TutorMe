import { useRouter } from "next/router";

export default function TutorHomePage(){
    const router = useRouter();

    function addMeeting(){
        router.push("/addMeeting")

    }



    return <>
    <button onClick={addMeeting}>Add a meeting</button>
    </>
}
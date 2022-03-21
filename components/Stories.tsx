import faker from "@faker-js/faker";
import { useSession } from "next-auth/react";
import { useEffect , useState } from "react";
import Story from "./Story";



const Stories:React.FC =() => {

    const {data: session} = useSession();

    const [suggestions , setsuggestions] = useState([faker.helpers.contextualCard()]);
    useEffect(() => {
        const suggestions = [...Array(50)].map((_ , i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));
    
        setsuggestions(suggestions)
        console.log(suggestions);
        }, []);


    return (
        <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounder-sm overflow-x-scroll
          scrollbar-thin scrollbar-thumb-black">
            {session && (
                <Story img={session.user?.image} username={session.user?.name} />
            )}  
            {suggestions.map(profile => (
                <Story key={profile.id} 
                img={profile.avatar} 
                username={profile.username} 
                />

            ))}
        </div>
    )
}

export

default Stories

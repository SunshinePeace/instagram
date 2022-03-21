import faker from '@faker-js/faker';
import {useState, useEffect} from 'react';

const Suggestions:React.FC = () => {

    const [suggestions, setSuggestions] = useState([faker.helpers.contextualCard()])
    useEffect( () => {
        const suggestions = [...Array(5)].map((_,i) => (
            {
                ...faker.helpers.contextualCard(),
                id: i,
            }

        ))
            setSuggestions(suggestions)
    },[])


    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>

            {
                suggestions.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between mt-3">
                    <img className='w-10 h-10 rounded-full border p-[2px]' src={profile.avatar} alt="profile avatar" />
                    <div className='flex-1 ml-4'>
                        <h2 className="font-semibold text-sm">{profile.username}</h2>
                        <h3 className="text-xs text-gray-400 truncate">Work at {profile.company.name}</h3>
                    </div>
                    <button className=' font-bold text-blue-400 text-sm'>Follow</button>
                    </div>


                ))

            }
        </div>
    )
}

export default Suggestions

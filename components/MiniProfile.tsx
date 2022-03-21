import { signOut, useSession } from "next-auth/react"


const MiniProfile:React.FC = () => {

    const { data: session } = useSession()

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img src={session?.user?.image || null || undefined} 
            alt="profile pic" className="rounded-full border p-[2px] w-16 h-16"/>

            <div className="flex-1 mx-4">
                <h2 className="font-bold">{session?.user.username? String: undefined}</h2>
                <h3 className=" text-sm text-gray-400">Welcome to IG!!!</h3>
            </div>
            <button className="text-blue-400 text-sm font-semibold" onClick={() => signOut()}>Sign Out</button>
        </div>




    )
}

export default MiniProfile

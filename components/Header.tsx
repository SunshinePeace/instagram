import Image from "next/image"
import {SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon, HomeIcon} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { signIn,signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header:React.FC = () => {

    const { data:session , status } = useSession();
    const router = useRouter();
    const [open , setOpen] = useRecoilState(modalState);

    return (
        <div className="shadow-sm border-b bg-white sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
            {/*Left */}
            <div className="relative hidden lg:inline-grid w-24" onClick={()=> router.push('/')} >
                <Image src= "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
                layout="fill" objectFit="contain" onClick={()=> router.push('/')}
                />
            </div>

            <div className="relative w-10  lg:hidden flex-shrink-0 cursor-pointer">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Instagram_simple_icon.svg" 
                layout="fill" objectFit="contain" onClick={()=> router.push('/')} />
            </div>

            {/*Middle -Search input field*/}
            <div className="max-w-xs">
                <div className="relative mt-1 p-3 rounded-m">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300
                    focus:ring-black focus:border-black rounded-md" type="text" placeholder="Search" />
                </div>
            </div>


            {/*Right */}
            <div className="flex items-center justify-end space-x-4">
                <HomeIcon className="navBtn" onClick={ ()=> router.push('/') }/>
                <MenuIcon className="h-6 md:hidden cursor-pointer"/>

                {session ? (
                    <>
                        <div className="relative navBtn">
                            <PaperAirplaneIcon className="navBtn rotate-45"/>
                            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 
                             rounded-full flex items-center justify-center animate-pulse text-white">3</div>
                            </div>
                
                            <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                            <UserGroupIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                
                            <img src={session?.user?.image}
                            alt="profile pic" className="h-10 w-10 rounded-full cursor-pointer"
                            onClick={() => signOut()}/>
                    </>
                )
                    :(
                        <button onClick={ () => signIn()}>Sign In</button>
                    )
                }


            </div>
            





            </div>
        </div>
    )
}

export default Header;

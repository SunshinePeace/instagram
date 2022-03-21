import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import Moment from "react-moment";




const Post:React.FC<{ id:any, username:any , userImg:any, img:any, caption: any }> 
    = ({id,username,userImg, img, caption}) => {

    const { data: session } = useSession();
    const [inputcomment, setInputComment] = useState<string>();
    const [comments, setComments] = useState<DocumentData>([]);
    const [likes, setLikes] = useState<DocumentData>([]);
    const [hasLiked, sethasLiked] = useState(false);
    

    useEffect(() => {
        onSnapshot(query(collection(database,'posts', id, 'comments'),
        orderBy('timestamp','desc')), (snapshot) => {
            setComments(snapshot.docs)
        });
    },[database, id])

    useEffect(() => {

        onSnapshot(collection(database,'posts', id ,'likes'), (snapshot) => {
            setLikes(snapshot.docs)
        })

    },[database, id])

    useEffect(() => 
        sethasLiked(likes.findIndex((like:any) => (like.id === session?.user.uid))  !== -1)
    , [likes]);


    const sendComment = async (e:any) => {

        e.preventDefault();

        const commentToSend = inputcomment;
        setInputComment("");

        await addDoc(collection(database,'posts', id , 'comments'),{
            comment: commentToSend,
            username: session?.user.username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        });
    }

    const likePost = async () => {

        if (hasLiked) {

            await deleteDoc(doc(database,"posts", id , 'likes', session?.user.uid));

        } else {
            await setDoc(doc(database,"posts", id , 'likes', session?.user.uid), {
                username: session?.user.username,
    
            })
        }



    }

    return (
        <div className="bg-white my-7 border rounded-sm">
            {/*Header */}
            <div className="flex items-center p-5">
                <img className="rounded-full h-12 w-12 object-contain border p-1 mr-3" src={userImg} alt="user image" />
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>


            {/*img */} 
                <img className=" font-extrabold w-full" src={img} alt="Posted image" />


            {/*Button */}
            {session && (
            <div className=" flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    {
                        hasLiked ? (
                            <HeartIconFilled onClick={likePost} className="btn text-red-500" />
                        ) : (
                            <HeartIcon onClick={likePost} className="btn"/>
                        )
                    }
                    <ChatIcon className="btn"/>
                    <PaperAirplaneIcon className="btn"/>
            </div>

                <BookmarkIcon className="btn"/>
        </div>
            )}

            {/*caption */}
            <p className="p-5 truncate">

                {likes.length > 0 && (
                    <p className="font-bold mr-1">{likes.length} likes</p>
                )}

                <span className=" font-black mr-1">{username} </span>{caption}</p>

            {/*comments */}
            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((comment:any) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" src={comment.data().userImage} alt="Commenter Image" />
                            <p className="text-sm flex-1"><span className="font-black">{comment.data().username}</span>{" "}
                            {comment.data().comment}</p>

                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>

                    ))}
                </div>
            )}



            {/* input Box */}

            {session && (

                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7 cursor-pointer" />
                    <input type="text" 
                    placeholder="Add a comment..." 
                    className="border-none flex-1 focus:ring-0 outline-none"
                    value={inputcomment}
                    onChange={e => setInputComment(e.target.value)}                 />
                    <button type="submit" 
                    disabled={!inputcomment?.trim()}
                    onClick={sendComment}
                    className="font-semibold text-blue-400">Post</button>
            </form>

            )}

        </div>
    )
}

export default Post

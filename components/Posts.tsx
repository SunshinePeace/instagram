import { collection, DocumentData, onSnapshot, orderBy, Query, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { database } from "../firebase";
import Post from "./Post"


const Posts:React.FC = () => {

    const [posts, setPosts] = useState<DocumentData>([]);

    useEffect(() => {
        onSnapshot(query(collection(database,'posts'), orderBy('timestamp','desc')), (snapshot) => {
            setPosts(snapshot.docs);

        });

    },[database])


    return (
        <div>
            {posts.map((post:any) => (
                <Post key={post.id} 
                  id={post.id} 
                  username={post.data().username}
                  userImg={post.data().profileImg}
                  img={post.data().image}
                  caption={post.data().caption}
                />
            ))}

        </div>
    )
}

export default Posts

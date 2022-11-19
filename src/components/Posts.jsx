import { collection, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Video from './Video';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const collRef = collection(db, 'posts');
        onSnapshot(query(collRef, orderBy('createdAt', 'desc')), snapshot => {
            setPosts(
                snapshot.docs.map(post => ({
                    id: post.id,
                    ...post.data(),
                })))
        });
    }, [db])

    return (
        posts.length !== 0 &&
        <div className='h-full snap-y overflow-y-scroll scroll-smooth snap-mandatory scrollbar-hide'>
            {posts.map(({ comments, email, likes, videoUrl, uName, uProfile, id, uid }) => (
                <Video
                    key={id}
                    videoUrl={videoUrl}
                    comments={comments}
                    email={email}
                    likes={likes}
                    uName={uName}
                    uProfile={uProfile}
                    id={id}
                    uid={uid}
                />
            ))}
        </div>

    )
}

export default Posts
import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/AuthContext';
import Modal from './Modal';
import Video from './Video';

function Posts() {
    const { posts } = useGlobalContext();
    const callback = (entries) => {
        entries.forEach((entry) => {
            const ele = entry.target.childNodes[0];
            ele.play().then(() => {
                if (!ele.paused && !entry.isIntersecting) {
                    ele.pause();
                }
            })
        })
    }

    const observer = new IntersectionObserver(callback, { threshold: 0.6 })

    useEffect(() => {
        const elements = document.querySelectorAll('.videos');
        elements.forEach((element) => {
            observer.observe(element);
        })

        return () => {
            observer.disconnect();
        }

    }, [posts])

    return (
        <>
            <Modal />
            {posts?.length !== 0 &&
                <div className='h-full snap-y overflow-y-scroll scroll-smooth snap-mandatory scrollbar-hide'>
                    {posts.map(({ comments, email, likes, videoUrl, uName, uProfile, id, uid }, index) => (
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
                            index={index}
                        />
                    ))}
                </div>}
        </>

    )
}

export default Posts
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/AuthContext'
import { db } from '../firebase';
import Like from './Like';

function Modal() {
    const { user } = useGlobalContext();
    const { modalOpen, posts, modalIndex, setModalOpen } = useGlobalContext();
    const [comment, setComment] = useState('');


    const postComment = async (e) => {
        e.preventDefault();
        if (comment === '')
            return;
        const commentToPost = comment;
        setComment('');

        await updateDoc(doc(db, 'posts', posts[modalIndex].id), {
            comments: arrayUnion({
                text: commentToPost,
                uName: user.displayName,
                email: user.email,
                uProfile: user.photoURL
            })
        })
    }



    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (!modalOpen)
                return;
            if (e.key === 'Escape')
                setModalOpen(false)
        })
    }, [])

    return (
        modalOpen &&
        <>
            <div className='absolute top-0 left-0 w-screen h-screen overflow-y-scroll scrollbar-hide backdrop-blur-[2px] bg-black/50 overflow-x-hidden z-20 mx-auto md:pt-7 md:px-10'>

                {/* modal div */}
                <div className='mx-auto grid relative md:grid-cols-2 md:max-h-[90vh] overflow-y-scroll scrollbar-hide  max-w-7xl bg-white md:rounded-md shadow-xl shadow-black/5'>
                    {modalOpen &&
                        <button
                            onClick={() => { setModalOpen(false) }}
                            className='absolute left-3  top-3 sm:top-4 sm:left-4 text-2xl md:text-3xl z-50'>
                            <BsArrowLeft className='text-white' />
                        </button>}
                    {/* video and likes */}
                    <section className='flex flex-col items-center pb-3 bg-white '>
                        <video src={posts[modalIndex]?.videoUrl} controls
                            className='h-full max-h-[70vh] w-full  object-contain bg-black'
                        ></video>



                        <div className='self-start pl-3 '>
                            <Like index={modalIndex} id={posts[modalIndex]?.id} likes={posts[modalIndex]?.likes} comments={posts[modalIndex]?.comments} />
                        </div>
                    </section>


                    {/* comments */}
                    <section className='bg-white py-3 h-full overflow-y-scroll scrollbar-hide'>
                        <Link
                            to={`/user?q=${user.email.slice(0, user.email.indexOf('@'))}`}
                            className='flex items-center  text-black space-x-2 font-semibold self-start px-3 md:mt-3'>
                            <img
                                alt=""
                                src={posts[modalIndex]?.uProfile}
                                className='w-8 aspect-square object-cover rounded-full'
                            />
                            <h2>{posts[modalIndex]?.uName} </h2>
                        </Link>
                        {/* post comment  */}
                        <form
                            onSubmit={postComment}
                            className=''>
                            <div className='flex items-start pl-4 my-3'>
                                <input type='text' placeholder='Post a comment'
                                    value={comment}
                                    onChange={(e) => { setComment(e.target.value) }}
                                    className='flex-grow outline-none'
                                />
                                <button
                                    disabled={comment === ''}
                                    className='px-2 text-sky-500 disabled:text-sky-500/50'>Post</button>
                            </div>

                        </form>
                        {/* all comments  */}
                        <div className='flex flex-col space-y-2 px-3 mt-5 md:mt-3'>
                            {posts[modalIndex]?.comments.map(({ text, email, uName, uProfile }, index) => (
                                <div
                                    key={index}
                                    className='flex items-start'
                                >
                                    <div
                                        className='flex items-start space-x-2 '>
                                        <Link to={`/user?q=${email.slice(0, email.indexOf('@'))}`}>
                                            <img src={uProfile} alt=""
                                                className='w-8 aspect-square object-cover rounded-full'
                                            />
                                        </Link>
                                        <h4><Link
                                            to={`/user?q=${email.slice(0, email.indexOf('@'))}`}
                                            className='font-semibold'>{uName}</Link> {text} </h4>
                                    </div>
                                    {/* <div className='mt-1 w-full flex-grow'>{text}</div> */}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div >
        </>


    )
}

export default Modal
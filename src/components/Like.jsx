import { updateDoc, arrayRemove, arrayUnion, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { RiHeartLine, RiHeartFill, RiChat1Line } from 'react-icons/ri'
import { useGlobalContext } from '../context/AuthContext';
import { db } from '../firebase';

function Like({ likes, id, comments, index }) {
    const [like, setLike] = useState(null);
    const { user, setModalOpen, setModalIndex } = useGlobalContext();
    useEffect(() => {
        const check = likes?.includes(user.email) || false;
        setLike(check);
    }, [likes]);

    const postLike = async () => {
        const docRef = doc(db, 'posts', id);
        if (like) {
            await updateDoc(docRef, {
                likes: arrayRemove(user.email)
            })
        }
        else {
            await updateDoc(docRef, {
                likes: arrayUnion(user.email)
            })
        }
    }

    return (
        <div className='flex items-center mt-3 space-x-2 select-none'>
            <button
                onClick={postLike}
            >
                <div className='transition-all hover:scale-110 active:scale-125 '>
                    {like ? <RiHeartFill className='text-2xl  text-rose-500' />
                        : <RiHeartLine className='text-2xl  ' />
                    }
                </div>
                <span>{likes?.length}</span>
            </button>
            <button
                onClick={() => {
                    setModalIndex(index);
                    setModalOpen(true);
                }}
            >
                <RiChat1Line className='text-2xl transition-all hover:scale-110 active:scale-125 ' />
                <span>{comments?.length}</span>
            </button>
        </div>
    )
}

export default Like
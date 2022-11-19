import { addDoc, arrayUnion, collection, collectionGroup, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react'
import { TfiVideoClapper } from 'react-icons/tfi'
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid'
import { useGlobalContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function UploadFile() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useGlobalContext();
    // console.log(user)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = async (file) => {
        if (loading) {
            setError('File upload on progress...');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        if (file === null) {
            setError('Please select a file first');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        setLoading(true);

        try {
            if (file.size / (1024 * 1024) > 100) {
                setError('Video must be less than 100MB')
                return;
            }
            const uid = uuid();
            const storageRef = ref(storage, `/posts/${uid}/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`${progress}% upload done`)
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('');
                }, [])
                setLoading(false);
            }

            async function fn3() {
                const url = await getDownloadURL(storageRef);
                console.log("Download url:", url);
                // await addDoc(collection(db,uid))
                const { displayName, email, photoURL } = user;
                const uploadRef = await addDoc(collection(db, 'posts'), {
                    likes: [],
                    comments: [],
                    postId: uid,
                    postUrl: url,
                    uName: displayName,
                    userId: email,
                    uProfile: photoURL,
                    createdAt: serverTimestamp()
                });
                // console.log(`uploadRef:`, uploadRef)
                // console.log("upload ref id:", uploadRef.id)
                await updateDoc(doc(db, 'users', user.uid), {
                    postIds: arrayUnion(uploadRef.id)
                })
                setLoading(false);
                inputRef.current.value = null;
            }
        } catch (err) {
            setError('Error occurred during upload');
            console.log(error)
            setTimeout(() => {
                setError('');
            }, 2000)
            setLoading(false)
            inputRef.current.value = null;
        }
        // navigate('/')
    }

    return (
        <div>
            <input
                ref={inputRef}
                onChange={(e) => { handleChange(e.target.files[0]) }}
                type="file" id='upload-input' accept='video/*'
                className='hidden'
            />
            <div className='relative w-fit mx-auto overflow-hidden text-fuchsia-700'>
                {error !== '' && <div className='text-center text-rose-600'>
                    {error}
                </div>}
                <label htmlFor='upload-input'
                    className={`flex items-center w-fit disabled:opacity-40 px-2 py-1 rounded-sm border-2 border-fuchsia-700/70  ${loading ? 'border-b-0 ' : ' cursor-pointer'}`}>
                    <TfiVideoClapper />
                    <span className='ml-2'>UPLOAD VIDEO</span>
                    {loading && <>
                        <div className='upload-progress bg-fuchsia-700 absolute w-1/2 h-1  bottom-0 left-0 z-20' />
                        <div className=' bg-fuchsia-700/40 absolute w-full h-1  bottom-0 left-0 ' />
                    </>}
                </label>
            </div>

        </div >
    )
}

export default UploadFile
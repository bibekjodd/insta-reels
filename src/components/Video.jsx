import React from 'react'
import ReactDOM from 'react-dom';
import Like from './Like';


function Video({ videoUrl, comments, email, likes, uName, uProfile, id, uid, }) {

    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted
    }

    const handleScroll = (e) => {
        const next = ReactDOM.findDOMNode(e.target).parentElement.parentElement.nextSibling;
        if (next) {
            next.scrollIntoView();
            e.target.muted = true;
            console.log(next)
        }
    }

    return (
        <div className='h-full relative bg-black text-white'>
            <div className='h-full'>
                <video src={videoUrl}
                    // controls
                    muted='muted'
                    onEnded={handleScroll}
                    onClick={handleClick}

                    className='h-full  snap-start  object-contain'
                />
            </div>
            <div className='absolute bottom-5 left-5 z-10'>
                <div className='flex items-center  text-white space-x-2 font-semibold'>
                    <img
                        alt=""
                        src={uProfile}
                        className='w-8 aspect-square object-cover rounded-full'
                    />
                    <h2>{uName}</h2>
                </div>
                <Like id={id} likes={likes} comments={comments} />
            </div>
        </div>
    )
}

export default Video
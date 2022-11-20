import React, { useEffect } from 'react'
import Posts from './Posts';

function Feed() {
   
    return (
        <div className='flex flex-col items-center flex-grow overflow-y-scroll h-full scrollbar-hide '>
            <Posts />
        </div>
    )
}

export default Feed
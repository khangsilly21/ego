import noNotiImage from '../asset/nonotification.svg'
import notiImage from '../asset/notification.svg'
import { useState } from 'react'
const Notification =()=>{
    const [source,Setsource]=useState(notiImage)
    return (
        <div>
            <img className='notiImage' src={source} alt='notification'/>
        </div>
    )
}

export default Notification
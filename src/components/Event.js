import { useState } from "react"
import avatar from '../asset//eventavatar.png'
export default function Event(){

    const [cards,setCards]= useState(
        [
            {
                avatar:avatar,
                name:'Connor Elington',
                position:'manager',
                title:'Book Fair',
                content:'Join us on March 15 for our Book Fair! Explore captivating reads for the entire family, seize the opportunity to enrich...',
                time:'January 27, 1:43 PM',
                emotion:{
                    like:12,
                    love:15,
                    haha:20
                    
                }
            }
        ]
    )
    const card=cards[0];
    return(
        <div className="sec2Item sec2Item3">
            <div className="nav">
                <p>Recent Events</p>
                <button>Show all</button>
            </div>
            <div className="card">
                <img className="cardAvatar" src={card.avatar}/>
                <div className="container">
                    <p className="name">{card.name}</p>
                    <p className="position">{card.position}</p>
                    <div className="status">
                        <p className="title">{card.title}</p>
                        <p className="content">{card.content}</p>
                        <p className="time">{card.time}</p>
                        <div className="emotion">
                            <button>&#128077; {card.emotion.like}</button>
                            <button><div className="love">&#x2764;</div> {card.emotion.love}</button>
                            <button>&#128518; {card.emotion.haha}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
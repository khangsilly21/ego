import { useState } from "react";
import avatar1 from '../asset/contactAvatar1.png';
import avatar2 from '../asset/contactAvatar2.png';
import avatar3 from '../asset/contactAvatar3.png';
const Contact=()=>{
    const [contactList,setContactList] = useState([{    
                                                        avatar: avatar1,
                                                        name:'Sam Lewis',
                                                        position:'Psyologist',
                                                        number:'+83 376756456'
                                                    },
                                                    {   
                                                        avatar:avatar2,
                                                        name:"Samuel Adamson",
                                                        position:"Mathermatician",
                                                        number:"+83 364790857"
                                                    },
                                                    {  
                                                        avatar:avatar3,
                                                        name:"Olivia Smith",
                                                        position:"Art Teacher",
                                                        number:"+83 343423877" 
                                                    }])
    return (
        <div className="box box3">
            <h2>Contacts</h2>
            <p>Here you can see the managers and their contacts</p>
            <ul className="contactContainer">
                {contactList.map((person,index)=>
                   ( <li key={index}>
                        <span className="avatar"><img src={person.avatar}/></span>
                        <span className="name">{person.name}<br/></span>
                        <span className="position">{person.position}</span>
                        <span className="number">{person.number}</span>
                     </li>)
                )}
            </ul>
            <button>Show all</button>
        </div>
    )
    }
    export default Contact;
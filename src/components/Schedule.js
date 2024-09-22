import { useState } from "react"

export default function Schedule(){
    const [tasks,setTasks] = useState([{
                                        timeStart:'8:45',
                                        timeEnd:'10:10',
                                        subject:'English Language Art'
                                    },
                                    {
                                        timeStart:'10:13',
                                        timeEnd:'10:54',
                                        subject:'Physical Education'
                                    },
                                    {
                                        timeStart:'10:57',
                                        timeEnd:'11:37',
                                        subject:'Mathemetics'
                                    },
                                    {
                                        timeStart:'11:40',
                                        timeEnd:'12:20',
                                        subject:'Lunch & Advisory'
                                    },
                                    {
                                        timeStart:'12:23',
                                        timeEnd:'13:03',
                                        subject:'Enrichment Class'
                                    },
                                    {
                                        timeStart:'13:06',
                                        timeEnd:'13:47',
                                        subject:'Science'
                                    }
                                    ])

    return (
        <div className="sec2Item sec2Item2">
            <p>Today's Schedule</p>
            <ul>
                {tasks.map((task,index)=>(
                    <div>
                    <li key={index}>
                        <div className="time">{task.timeStart} AM - {task.timeEnd} AM </div>
                        <div className="subject">{task.subject}</div> 
                    </li><hr/>
                    </div>
                ) )}
            </ul>
        </div>
    )
}
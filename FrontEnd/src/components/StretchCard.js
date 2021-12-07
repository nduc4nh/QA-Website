import { React, useState } from 'react'
import UserHeaderGroup from './UserHeaderGroup'
import './css/StretchCard.css'
import { BsCheck } from 'react-icons/bs'
import { FaQuestion } from 'react-icons/fa'
const StretchCard = ({ question }) => {
    const [pos, setPos] = useState(0)
    const [tickSize, setTickSize] = useState(20)
    const onEnterHandle = () => {
        setPos(pos - 10)
        setTickSize(tickSize+10)
    }

    const onLeaveHandle = () => {
        setPos(pos + 10)
        setTickSize(tickSize-10)
    }

    const truncate = (string) => {
        return string.length >= 40 ? string.slice(0, 37) + "..." : string
    }

    return (
        <div class="stretch-card-container">
            <div style={{
                position: "absolute",
                right:5,
                top:pos,
                zIndex:1
            }}>
                {question.done?<BsCheck size={tickSize+10} color='green'/>:<FaQuestion size={tickSize} color = {"#d54d7b"}/>}
            </div>
            <div style={{
                position: "absolute",
                width: "90%",
                top: pos,
                paddingTop: 20,
                paddingBottom: 50,
                boxShadow: "0px 2px 10px #d7d6d6",
                background: "white",

            }}
                onMouseEnter={onEnterHandle}
                onMouseLeave={onLeaveHandle}
            >
                <div style={{
                    paddingLeft: "10px",
                }}>
                    <div>
                        <UserHeaderGroup user={question.user} otherInfo={question.date} />
                    </div>
                    <div style={{ paddingLeft: 5, marginTop: 20, color: "black", fontSize: 20 }}>
                        {truncate(question.title)}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StretchCard


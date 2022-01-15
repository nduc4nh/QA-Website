import React from 'react'
import { lightGrey, primaryGrey } from '../constant/color'
import CustomButton from './CustomButton'
import { BsSearch } from 'react-icons/bs'
import { getOffsetTimeString } from '../utils/TimeConverter'
import { useNavigate } from 'react-router'

const SearchResultBox = ({ size, items, label }) => {
    const navigate = useNavigate()
    console.log(items)
    return (
        <div
            style={{
                maxHeight: "400px",
                width: "100%"
            }}>
            <div style={{
                borderTop: "hidden",
                borderRight: "hidden",
                borderBottom: `2px solid ${lightGrey}`,
                marginRight: "30px"
            }}>
                <BsSearch />
                <span style={{ marginLeft: "10px", color: `${primaryGrey}` }}>{label}</span>
            </div>
            <div style={{
                overflowY: "scroll",
                height: "100%"
            }}>
                {items.length === 0 ? <div style={{
                    paddingLeft:"20px",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    height:"50px",
                    textAlign:"center",
                    color: `${primaryGrey}`
                }}> No questions related to this keyword</div> : <div></div>}
                {items && items.map((item,i) => (
                    <div style={{
                        flex: 1,
                        borderRadius: "10px",
                        boxShadow: "0px 2px 10px #d7d6d6",
                        marginTop: "10px",
                        margin: "10px"
                    }}>
                        <CustomButton border={"10px"} onClick={() => navigate(`/question?questionId=${item._id}`)}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%"
                            }}>

                                <div style={{
                                    borderTop: "hidden",
                                    borderRight: "1px solid #dddddd",
                                    borderBottom: "hidden",
                                    borderLeft: "hidden",
                                    width: "100px",
                                    color: `${primaryGrey}`
                                }}>
                                    {getOffsetTimeString(item.createdAt)}
                                </div>
                                <div style={{
                                    flex: 1,
                                    color: `${primaryGrey}`

                                }}>
                                    {item.title}
                                </div>
                            </div>
                        </CustomButton>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SearchResultBox

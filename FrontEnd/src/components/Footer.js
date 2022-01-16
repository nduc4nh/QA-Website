import React, { useState } from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsTelephone } from 'react-icons/bs'
import { BiLocationPlus } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import "./css/Footer.css"
import { primaryColor, primaryHoverColor } from '../constant/color'
const Footer = () => {
    const [buttonColor, setButtonColor] = useState("none")

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            position:"absolute",
            width: "100%",
            height: "250px",
            bottom: "-400px",
              
            boxShadow: "0px 2px 10px #d7d6d6",
            borderColor: "#dddddd",
            border: "1px",
            borderWidth: "1px",
            borderRight: "0px",
            borderLeft: "0px",
            borderBottom: "0px",
            paddingLeft: "100px",
            paddingTop: "50px",
            
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: "100%",
                minWidth: "400px"
            }}>
                <div className='text-footer'>
                    QA-website
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: "100%",
                minWidth: "400px"
            }}>

                <div className='text-footer'>
                    Contact
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px"
                }}>
                    <BsFacebook size={38}
                        style={{
                            marginRight: "20px",
                            cursor: "pointer"
                        }}
                        color={buttonColor}
                        onClick={() => (1)}
                        onMouseEnter={() => (setButtonColor(primaryHoverColor))}
                        onMouseLeave={() => (setButtonColor(primaryColor))} />
                    <BsInstagram size={38} style={{ marginRight: "20px" }}
                        style={{
                            marginRight: "20px",
                            cursor: "pointer"
                        }}
                        color={buttonColor}
                        onClick={() => (1)}
                        onMouseEnter={() => (setButtonColor(primaryHoverColor))}
                        onMouseLeave={() => (setButtonColor(primaryColor))} />
                    <BsTwitter size={38} style={{ marginRight: "20px" }}
                        style={{
                            marginRight: "20px",
                            cursor: "pointer"
                        }}
                        color={buttonColor}
                        onClick={() => (1)}
                        onMouseEnter={() => (setButtonColor(primaryHoverColor))}
                        onMouseLeave={() => (setButtonColor(primaryColor))} />
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: "100%",
                minWidth: "400px"
            }}>
                <div className='text-footer'>
                    More
                </div>
                <div>
                    <AiOutlineMail size={24} />
                </div>
                <div>
                    <BiLocationPlus size={24} />
                </div>
                <div>
                    <BsTelephone size={24} />
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: "100%",
                minWidth: "400px"
            }}>
                <div className='text-footer'>
                    Contribution
                </div>
                <div className='text-footer-default'>
                    Frontend
                </div>
                <div className='text-footer-default'>Nguyen Duc Anh</div>
                <div className='text-footer-default'>Bui Hoang Loc</div>
                <div className='text-footer-default'>
                    Backend
                </div>
                <div className='text-footer-default'>Quoc</div>
                <div className='text-footer-default'>Binh</div>
            </div>
        </div>
    )
}

export default Footer

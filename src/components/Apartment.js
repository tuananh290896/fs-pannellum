import React, { useState } from 'react';
import apartments from '../data/apartment.json';

const Apartment = (props) => {
    const [selected, setSelected] = useState(0);

    const onChangeNav = (e, floor) => {
        e.preventDefault();
        setSelected(floor);
    }

    return (
        <div className="banner">
            <div className="nav">
                {
                    apartments.map((item, index) => {
                        return <a key={index} className={`nav-item ${selected == item.floor && 'active'}`} href="#" onClick={(e) => onChangeNav(e, item.floor)}>
                            {item.floor ? `Tầng ${item.floor}` : 'Tổng quan'}
                        </a>
                    })
                }
            </div>
            <div className="main-view">
                {
                    apartments.map((item, index) => {
                        return <div key={index} className={`item-floor ${selected == item.floor && 'show'}`} href="#" data-floor={item.floor}>
                            <img src={item.path} alt={`floor ${item.floor}`}/>
                            <div className="overlays-svg">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                x="0"
                                y="0"
                                enableBackground="new 0 0 720 480"
                                version="1.1"
                                viewBox="0 0 720 480"
                                xmlSpace="preserve"
                            >
                                {
                                    item.rooms && item.rooms.map((room, key) => {
                                        return (
                                        <g id={`room_${room.num}`} data-code={room.num} class="enabled" key={key}>
                                            <polygon points={room.polygon}></polygon>
                                            <circle {...room.circle} ></circle>
                                            <text {...room.room_text_location} dominantBaseline="middle" textAnchor="middle">{room.num}</text>
                                            <text {...room.status_text_location}dominantBaseline="middle" textAnchor="middle" className="status-enabled">Available</text>
                                        </g>
                                    )
                                    })
                                }
                            </svg>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Apartment;
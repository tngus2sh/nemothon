import React, {useEffect, useState} from "react";

import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import axios from "axios";

// import axios from "axios";


// this.calendarRef =

// this.calenderRef = React.createRef();
// const [events, setEvents] = useState([]);

class DailyPlan extends React.Component {
    // const [categories, setCategories] = useState([]);

    state = {
        events: []
    }

    calendarRef = React.createRef();

    // constructor() {
    //     super();
    //     axios.get(`http://localhost:8080/api/event/day/2023-08-31`, {
    //         headers: {
    //             Authorization: localStorage.getItem("token")
    //         }
    //     })
    //         .then((response) => {
    //             console.log("이벤트 목록 = {}", response.data)
    //             setEvents(response.data);
    //         });
    // }


    handleClickNextButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();

        calendarInstance.next();
    };

    handleClickPrevButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();

        calendarInstance.prev();
        let showDate = calendarInstance.getDate().toUTCString();
        console.log("표시날짜 = {}", showDate);
        // axios
        //         .get(`http://localhost:8080/api/event/day/2023-08-31`, {
        //             headers: {
        //                 Authorization: localStorage.getItem("token")
        //             }
        //         })
        //         .then((response) => {
        //             console.log("이벤트 목록 = {}", response.data)
        //             setEvents(response.data);
        //         });
    };

    // const btnPrev = () => {
    //     const calendarInstance = this.calenderRef.current.getInstance();
    // }

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8080/categories`, {
    //             headers: {
    //                 Authorization: sessionStorage.getItem("jwt")
    //             }
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //             setCategories(response.data);
    //         });
    //
    //     axios
    //         .get(`http://localhost:8080/api/event/day/2023-08-31`, {
    //             headers: {
    //                 Authorization: localStorage.getItem("token")
    //             }
    //         })
    //         .then((response) => {
    //             console.log("이벤트 목록 = {}", response.data)
    //             setEvents(response.data);
    //         });
    // }, []);

    componentDidMount() {
        const calendarInstance = this.calendarRef.current.getInstance();
        const showDate = toStringByFormatting(calendarInstance.getDate());
        console.log("표시날짜 = ", showDate);
        axios
            .get(`/api/event/day/${showDate}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("이벤트 목록 = {}", response.data)
                this.state.events = response.data;
                // setEvents(response.data);
            });
    }

    render() {
        return (
            <div>
                <div className='top-bar'></div>
                <Calendar
                    ref={this.calendarRef}
                    view={"day"}
                    height="700px"
                    calendars={[
                        {
                            id: '0',
                            name: 'Private',
                            bgColor: '#9e5fff',
                            borderColor: '#9e5fff'
                        },
                        {
                            id: '1',
                            name: 'Company',
                            bgColor: '#00a9ff',
                            borderColor: '#00a9ff'
                        }
                    ]}
                    isReadOnly={true}
                    events={
                        this.state.events

                    }
                    useDetailPopup={true}
                    week={{
                        // dayNames: ["일", "월", "화", "수", "목", "금", "토"],
                        taskView: false
                    }}
                />
                <button onClick={this.handleClickPrevButton}>prev</button>
                <button onClick={this.handleClickNextButton}>next</button>
            </div>
        );
    }
}

function leftPad(value) {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
}

export default DailyPlan;
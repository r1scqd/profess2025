import './App.css'
import logo from './assets/Logo.png'
import {useEffect, useState} from "react";
import axios from "./api/base.js";
import moment from 'moment'
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

function App() {


    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])

    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get('/api/v1/users').then(res => {
            setUsers(res.data)
        })
        axios.get('/api/v1/events').then(res => {
            setEvents(res.data)
        })
    }, []);

    const [news, setNews] = useState([
        {
            name: 'Название новости',
            date: '2025-04-02',
            description: 'Описание новости............',
            image: logo
        },
        {
            name: 'Название новости',
            date: '2025-04-02',
            description: 'Описание новости............',
            image: logo
        },
        {
            name: 'Название новости',
            date: '2025-04-02',
            description: 'Описание новости............',
            image: logo
        },
        {
            name: 'Название новости',
            date: '2025-04-02',
            description: 'Описание новости............',
            image: logo
        },
    ])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>

            <div className={'wrapper'}>
                <header className={'flex-row '}>
                    <img src={logo} alt="logo" className={'logo'}/>
                    <input className={'search'} placeholder={'Поиск...'} value={query}
                           onChange={e => setQuery(e.target.value.toLowerCase())}/>
                </header>
                <div className={'p-lg-4 h-100'}>
                    <div className={'d-flex flex-column align-items-start overflow-x-auto'}>
                        <b>Сотрудники:</b>
                        <div className={'d-flex flex-row  gap-2'}>
                            {users.filter(u => {
                                if (!query) {
                                    return true
                                }
                                return (u.name.toLowerCase().includes(query)) || (u.email.toLowerCase().includes(query)) || (u.work_phone.toLowerCase().includes(query)) || (u.position.toLowerCase().includes(query))
                            }).map((item, index) => (
                                <div className={'userItem'}>
                                    <div><b>{item.name}</b></div>
                                    <div>{item.position}</div>
                                    <div>{item.email}</div>
                                    <div>{item.work_phone}</div>
                                    <div className={'d-flex flex-row justify-content-between px-2 qrbtn'}>
                                        <div>День: {moment(item.birthday).day()} Месяц: {moment(item.birthday).month()}</div>
                                        <a className={'qrbtn'}
                                           href={import.meta.env.VITE_PUBLIC_URL + `/api/v1/user/${item.id}/ics`}>K</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={'d-flex flex-row mt-5'}>
                        <div className={'d-flex flex-column gap-2'}>
                            <div className={'d-flex flex-column'}>
                                <b>Календарь событий</b>
                                <DateCalendar/>
                            </div>
                            <div className={'d-flex flex-column'}>
                                <b>События</b>
                                {events
                                    .filter(u => {
                                        if (!query) {
                                            return true
                                        }
                                        return (u.name.toLowerCase().includes(query)) || (u.description.toLowerCase().includes(query)) || (u.date.toLowerCase().includes(query)) || (u.author.name.toLowerCase().includes(query))
                                    })
                                    .map(ev => {
                                        return (<div>
                                            <div><b>{ev.name}</b></div>
                                            <div>{ev.description}</div>
                                            <div className={'d-flex justify-content-between'}>
                                                <div className={'d-flex'}>
                                                    <a className={'qrbtn'}
                                                       href={import.meta.env.VITE_PUBLIC_URL + `/api/v1/event/${ev.id}/ics`}>K</a>

                                                    {ev.date.slice(0, 10)}
                                                </div>
                                                <div>{ev.author.name}</div>
                                            </div>
                                        </div>)
                                    })}
                            </div>

                        </div>
                        <div className={'d-flex flex-column align-items-start'}>
                            <b>Новости</b>
                            <div className={'d-flex flex-row mt-1 flex-wrap'}>
                                {news
                                    .filter(u => {
                                        if (!query) {
                                            return true
                                        }
                                        return (u.name.toLowerCase().includes(query)) || (u.description.toLowerCase().includes(query)) || (u.date.toLowerCase().includes(query))
                                    })
                                    .map((item, index) => (
                                        <div className={'newsItem align-items-start'}>
                                            <img className={'newsImg'} src={item.image}/>
                                            <div className={'newsContent'}>
                                                <div><b>{item.name}</b></div>
                                                <div>{item.description}</div>
                                                <div>{item.date}</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    )
}

export default App

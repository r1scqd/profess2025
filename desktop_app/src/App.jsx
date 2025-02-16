import logo from './assets/Logo.png'
import './App.css'
import {useEffect, useState} from "react";
import axios from "./api/base.js";
import OrgStruct from "./components/OrgStruct.jsx";
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import {useForm} from "react-hook-form";
import classNames from "classnames";

const phoneRegex = new RegExp("[ \\-+\\d()]{1,20}")

function App() {

    const [modal, setModal] = useState(null)

    const [deps, setDeps] = useState([])

    const [userInDep, setUserInDep] = useState([])

    const [selectedUser, setSelectedUser] = useState(null)

    const {register, setValue, handleSubmit, setError, formState: {errors}, reset} = useForm()

    useEffect(() => {
        setModal(new bootstrap.Modal(document.getElementById('modal')))
    }, []);

    const [depsTree, setDepsTree] = useState(null)

    const [selectedDepartment, setSelectedDepartment] = useState(null)

    const [users, setUsers] = useState([])

    useEffect(() => {
        if (selectedDepartment) {
            axios.get(`/api/v1/department/${selectedDepartment.id}/users`).then(res => {
                setUsers(res.data.users)
                setUserInDep(res.data.users_in)
            })
        } else {
            setUsers([])
            setUserInDep([])
        }
    }, [selectedDepartment]);

    useEffect(() => {
        axios.get('/api/v1/departments').then(res => {
            setDepsTree(res.data.departments)
            setDeps(res.data.flat)
        })
    }, []);

    const onSubmit = async (data) => {
        let hasError = false
        if (data.phone && !phoneRegex.test(data.phone)) {
            setError('phone', {message: 'Неверный номер телефона'})
            hasError = true
        }
        if (data.work_phone && !phoneRegex.test(data.work_phone)) {
            setError('work_phone', {message: 'Неверный номер телефона'})
            hasError = true
        }
        if (hasError) {
            return;
        }
        if (selectedUser) {
            await axios.post(`/api/v1/user/${selectedUser.id}`, data)
        } else {
            await axios.post(`/api/v1/users`, data)
        }
    }


    const [events, setEvents] = useState(null)

    const [evIsPast, setEvIsPast] = useState(false)
    const [evIsToday, setEvIsToday] = useState(true)
    const [evIsFuture, setEvIsFuture] = useState(true)

    const evF = useForm()

    useEffect(() => {
        if (!selectedUser) {
            setEvents(null)
            return
        }
        const p = new URLSearchParams()
        if (evIsPast){
            p.set('past', '1')
        }
        if (evIsToday){
            p.set('today', '1')
        }
        if (evIsFuture){
            p.set('future', '1')
        }
        axios.get(`/api/v1/user/${selectedUser.id}/events?${p}`).then(res => {
            setEvents(res.data)
        })
    }, [evIsPast, evIsToday, evIsFuture, selectedUser]);

    const onEvSubmit = async (data) => {
        await axios.post(`/api/v1/user/${selectedUser.id}/event`, data)
    }

    return (
        <div className={'flex-column flex wrapper'}>
            <header className={'flex-row '}>
                <img src={logo} alt="logo" className={'logo'}/>
                <div className={'search'}>
                    Организационная структура
                </div>
            </header>
            <div className={'content position-relative'}>
                <div className={'contentElement overflow-auto'}>
                    {depsTree && (<OrgStruct selectedId={selectedDepartment?.id} onClick={(st => {
                        setSelectedDepartment(st)
                    })} struct={depsTree}/>)}
                </div>
                <div className={'contentElement userList overflow-auto'}>
                    {users.map((item, index) => {
                        let clx = ''
                        if (item.dismissal_date) {
                            clx = 'userItemDel'
                        }
                        return (<div key={index} className={'d-flex flex-column gap-2 userItem ' + clx}
                                     onClick={() => {
                                         document.getElementById('myForm').setAttribute('inert', '')
                                         setSelectedUser(item)
                                         setValue('name', item.name)
                                         setValue('phone', item.phone)
                                         setValue('birthday', item.birthday)
                                         setValue('position', item.position)
                                         setValue('department_id', item.department_id)
                                         setValue('manager_id', item.manager_id)
                                         setValue('helper_id', item.helper_id)
                                         setValue('email', item.email)
                                         setValue('cabinet', item.cabinet)
                                         setValue('work_phone', item.work_phone)
                                         setValue('additional_info', item.additional_info)
                                         modal.show()
                                     }}>
                            <div>{item.department.name} - {item.position}</div>
                            <div><b>{item.name}</b></div>
                            <div>{item.work_phone} {item.email}</div>
                            <div>{item.cabinet}</div>
                        </div>)
                    })}
                </div>
                <button className={'addUser'} onClick={() => {
                    setSelectedUser(null)
                    reset()
                    setValue('department_id', selectedDepartment.id)
                    modal.show()
                    document.getElementById('myForm').removeAttribute('inert')
                }}>+
                </button>
            </div>
            <div className={'modal'} id={'modal'}>
                <div className={'modal-dialog myModal'}>
                    <div className={'modal-content'}>
                        <div className={'modal-header'}>
                            <div className={'modal-title'}>Карточка сотрудника</div>
                        </div>
                        <div className={'modal-body myModalBody'}>
                            <div className={'myModalElements position-relative'}>
                                {selectedUser && !selectedUser.dismissal_date && (
                                    <button className={'pencil'} onClick={() => {
                                        document.getElementById('myForm').removeAttribute('inert')
                                    }}>К</button>)}
                                {selectedUser && !selectedUser.dismissal_date && (
                                    <button className={'dismissUser'} onClick={() => {
                                        if (confirm('Вы уверены?')) {
                                            axios.delete(`/api/v1/user/${selectedUser.id}/dismiss`).then(res => {
                                                alert('Сотрудник уволен')
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }
                                    }}>У</button>)}
                                <form onSubmit={handleSubmit(onSubmit)} id={'myForm'}>
                                    <div className={'d-flex flex-column gap-2 '}>

                                        <div>ФИО</div>
                                        <input {...register('name')}/>
                                        {errors.name && <div>{errors.name.message}</div>}
                                        <div>телефон</div>
                                        <input {...register('phone')} maxLength={20}/>
                                        {errors.phone && <div>{errors.phone.message}</div>}
                                        <div>Рабочий телефон</div>
                                        <input {...register('work_phone')} maxLength={20}/>
                                        {errors.work_phone && <div>{errors.work_phone.message}</div>}
                                        <div>День рождения</div>
                                        <input {...register('birthday')} type={'date'}/>
                                        {errors.birthday && <div>{errors.birthday.message}</div>}
                                        <div>Должность</div>
                                        <input {...register('position')}/>
                                        {errors.position && <div>{errors.position.message}</div>}
                                        <div>Подразделение</div>
                                        <select {...register('department_id')}>
                                            {deps.map((item, index) => {
                                                return <option value={item.id} key={index}>{item.name}</option>
                                            })}
                                        </select>
                                        {errors.department_id && <div>{errors.department_id.message}</div>}
                                        <div>Непосредственный руководитель</div>
                                        <select {...register('manager_id')}>
                                            {userInDep.map((item, index) => {
                                                return <option value={item.id} key={index}>{item.name}</option>
                                            })}
                                        </select>
                                        {errors.manager_id && <div>{errors.manager_id.message}</div>}
                                        <div>Помощник</div>
                                        <select {...register('helper_id')}>
                                            {userInDep.map((item, index) => {
                                                return <option value={item.id} key={index}>{item.name}</option>
                                            })}
                                        </select>
                                        {errors.helper_id && <div>{errors.helper_id.message}</div>}
                                        <div>Почта</div>
                                        <input {...register('email')}/>
                                        {errors.email && <div>{errors.email.message}</div>}
                                        <div>Кабинет</div>
                                        <input {...register('cabinet')} maxLength={10}/>
                                        {errors.cabinet && <div>{errors.cabinet.message}</div>}
                                        <div>Прочая информация</div>
                                        <input {...register('additional_info')}/>
                                        {errors.additional_info && <div>{errors.additional_info.message}</div>}
                                        <button type={'submit'}>Сохранить</button>
                                    </div>
                                </form>
                            </div>
                            <div className={'myModalElements'}>
                                <div className={'d-flex flex-row gap-2 justify-content-between'}>
                                    <button className={classNames('filter', {'filterEnable': evIsPast})}
                                            onClick={() => setEvIsPast(p => !p)}
                                    >Прошедшие{evIsPast}
                                    </button>
                                    <button className={classNames('filter', {'filterEnable': evIsToday})}
                                            onClick={() => setEvIsToday(p => !p)}
                                    >Текущие
                                    </button>
                                    <button className={classNames('filter', {'filterEnable': evIsFuture})}
                                            onClick={() => setEvIsFuture(p => !p)}
                                    >Будущие
                                    </button>
                                </div>
                                {events && (
                                    <div className={'d-flex flex-column gap-2 py-4'}>
                                        {events.education.length > 0 ? (<div>
                                            <div>Обучения</div>
                                            {events.education.map(ed => {
                                                return (<div key={ed.id} className={'event'}>
                                                    <div>Номер: {ed.id}</div>
                                                    <div>Начало: {ed.start_date}</div>
                                                    <div>Конец: {ed.stop_date}</div>
                                                    <div>Обоснование: {ed.justification}</div>
                                                </div>)
                                            })}
                                        </div>) : (<div>Обучений нет</div>)}
                                        {events.absences.length > 0 ? (<div>
                                            <div>Отгулы</div>
                                            {events.absences.map(ed => {
                                                return (<div key={ed.id} className={'event'}>
                                                    <div>Номер: {ed.id}</div>
                                                    <div>Начало: {ed.start_date}</div>
                                                    <div>Конец: {ed.stop_date}</div>
                                                    <div>Обоснование: {ed.justification}</div>
                                                </div>)
                                            })}
                                        </div>) : (<div>Отгулов нет</div>)}
                                        {events.vacations.length > 0 ? (<div>
                                            <div>Отпуска</div>
                                            {events.vacations.map(ed => {
                                                return (<div key={ed.id} className={'event'}>
                                                    <div>Номер: {ed.id}</div>
                                                    <div>Начало: {ed.start_date}</div>
                                                    <div>Конец: {ed.stop_date}</div>
                                                    <div>Обоснование: {ed.justification}</div>
                                                </div>)
                                            })}
                                        </div>) : (<div>Отпусков нет</div>)}
                                        <div>
                                            <form onSubmit={evF.handleSubmit(onEvSubmit)}>
                                                <div className={'d-flex flex-column gap-2 '}>
                                                    <div>Тип</div>
                                                    <select {...evF.register('type')}>
                                                        <option value={'education'}>Обучение</option>
                                                        <option value={'absences'}>Отгул</option>
                                                        <option value={'vacations'}>Отпуск</option>
                                                    </select>
                                                    <div>Начало</div>
                                                    <input {...evF.register('start_date')} type={'date'}/>
                                                    <div>Конец</div>
                                                    <input {...evF.register('stop_date')} type={'date'}/>
                                                    <div>Обоснование</div>
                                                    <input {...evF.register('justification')}/>
                                                    <button type={'submit'}>Добавить</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

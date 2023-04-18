import React, { useEffect, useState } from 'react'
import '../../styles/clock.css'

const Clock = () => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    let interval;
    const countDown = () => {
        const destino =new Date('2023-04-29T00:00:00Z').getTime();
        interval = setInterval(()=>{
            const ahora = new Date().getTime();
            const different = destino  - ahora;
            const days = Math.floor(different /(1000 * 60 * 60 * 24))
            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(different % (1000 * 60 * 60) / (1000*60))
            const seconds = Math.floor(different % (1000 * 60 ) / 1000)
            if(destino < 0 ) clearInterval(interval.current)
            else{
                setDays(parseInt(days));
                setHours(parseInt(hours));
                setMinutes(parseInt(minutes));
                setSeconds(parseInt(seconds));
            }
        });
    };
    useEffect(()=>{
        countDown()
    });
  return (
    <div className="clock__wrapper d-flex align-items-center gap-3 ">
        <div className="clock__data d-flex align-items-center gap-3">
            <div className='text-center'>
                <h1 className='text-white fs-3 mb-2'>{days}</h1>
                <h5 className='text-white fs-6'>Dias</h5>
            </div>
            <span className='text-white fs-3'>:</span>
        </div>
        <div className="clock__data d-flex align-items-center gap-3">
            <div className='text-center'>
                <h1 className='text-white fs-3 mb-2'>{hours}</h1>
                <h5 className='text-white fs-6'>Horas</h5>
            </div>
            <span className='text-white fs-3'>:</span>
        </div>
        <div className="clock__data d-flex align-items-center gap-3">
            <div className='text-center'>
                <h1 className='text-white fs-3 mb-2'>{minutes}</h1>
                <h5 className='text-white fs-6'>Minutos</h5>
            </div>
            <span className='text-white fs-3'>:</span>
        </div>
        <div className="clock__data d-flex align-items-center gap-3">
            <div className='text-center'>
                <h1 className='text-white fs-3 mb-2'>{seconds}</h1>
                <h5 className='text-white fs-6'>Segudos</h5>
            </div>
        </div>
    </div>
  )
}
export default Clock

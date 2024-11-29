import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Schedule.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Schedule = () => {
    const [view, setView] = useState('weekly');
    const [schedules, setSchedules] = useState([]);
    const [services, setServices] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const schedulesPerPage = 6;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        day: '',
        start_time: '',
        end_time: '',
        timezone: 'UTC',
        service: '',
        instructor: ''
      });

    const handleMonthChange = (direction) => {
        if (direction === -1) {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else if (direction === 1) {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getDayName = (dayIndex) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
        return days[dayIndex];
    };

    useEffect(() => {
        fetchSchedules();
        fetchServices();
        fetchInstructors();
      }, []);
    
      const fetchSchedules = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/schedules');
          const data = await response.json();
          setSchedules(data);
        } catch (error) {
          console.error('Error fetching schedules:', error);
        }
      };
    
      const fetchServices = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/services');
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };
    
      const fetchInstructors = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/instructors');
          const data = await response.json();
          setInstructors(data);
        } catch (error) {
          console.error('Error fetching instructors:', error);
        }
      };

    const handleViewChange = (view) => {
        setView(view);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(schedules.length / schedulesPerPage)));
    };

    const getMonthName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('default', { month: 'long' });
    };

    const getDateNumber = (dateString) => {
        const date = new Date(dateString);
        return date.getDate();
    };

    const getTimeOfDayIcon = (timeString) => {
        const [hour] = timeString.split(':').map(Number);
        if (hour >= 6 && hour < 12) {
            return "images/sun.svg";
        } else {
            return "images/moon.svg";
        }
    };

    const displayedSchedules = schedules.slice(currentPage * schedulesPerPage, (currentPage + 1) * schedulesPerPage);

    const getCurrentMonthYear = () => {
        if (displayedSchedules.length > 0) {
            const date = new Date(displayedSchedules[0].date);
            return `${getMonthName(date.toISOString())} ${date.getFullYear()}`;
        }
        return '';
    };

    const getCurrentDateRange = () => {
        if (displayedSchedules.length > 0) {
            const startDate = new Date(displayedSchedules[0].date);
            const endDate = new Date(displayedSchedules[displayedSchedules.length - 1].date);
            return `${getMonthName(startDate.toISOString())} ${getDateNumber(startDate.toISOString())} - ${getMonthName(endDate.toISOString())} ${getDateNumber(endDate.toISOString())}`;
        }
        return '';
    };

    const handlePreviousMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const createCalendarDays = () => {
        const totalDays = daysInMonth + firstDayOfMonth;
        return Array.from({ length: totalDays }, (_, i) => {
            if (i < firstDayOfMonth) {
                return null;
            } else {
                return i - firstDayOfMonth + 1;
            }
        });
    };

    const calendarDays = createCalendarDays();

    const handleBookClass = (schedule) => {
      navigate('/book', { state: { schedule } });
  };

    return (
        <div >
            <Navbar />
            <div className="hero-cobra">
                <div className="hero-text-cobra">
                <div class="logo-cobra">
                    <img src="images/background-2.svg" alt="Logo"/>
                </div>
                <h1>Class Schedule</h1>
                </div>
            </div>
            <div className="bg-[var(--background)] text-[var(--foreground)] p-6">
            <div className="decorative-p-6-left">
                  <img src='images/background-2 (1).svg' alt="Decorative element" />
                </div>

                <div className="decorative-p-6-right">
                  <img src='images/background-2 (1).svg' alt="Decorative element" />
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold">IMPORTANT INFORMATION</h2>
                        <p className="text-sm mt-2">
                            If you are on waitlist for a class, you may be bumped in due to a cancellation. This is now your spot in the class and is treated as if you have booked into the class as normal. If you can NO
                            LONGER attend this class you MUST CANCEL your spot.
                        </p>
                        <p className="text-sm mt-2">
                            Cancellations made less than 12 hours prior to class commencement will be strictly non-refundable and will incur the full charge of the class / session for membership packages.
                        </p>
                        <div className="mt-4">
                            <button
                                onClick={() => handleViewChange('weekly')}
                                className={`py-2 px-4 rounded-first ${view === 'weekly' ? 'button-active' : 'button-inactive'}`}
                            >
                                Weekly view
                            </button>
                            <button
                                onClick={() => handleViewChange('monthly')}
                                className={`py-2 px-4 rounded-second ml-2 ${view === 'monthly' ? 'button-active' : 'button-inactive'}`}
                            >
                               <span className='monthly-view'>Monthly view</span>
                            </button>
                        </div>
                    </div>

                    {view === 'weekly' ? (
                        <div className="bg-[var(--card)] text-[var(--card-foreground)] p-4 rounded-lg shadow">
                             <h3 className="text-xl font-semibold">{getCurrentMonthYear()}</h3>
                           
                            <div className="flex justify-between items-center mb-4 display">
                           
                                
                                <div className="flex items-center border-button">
                                    <button className="text-xl px-2 b-mr-l" onClick={handlePreviousPage}><img src='images/chevron-left.svg'/></button>
                                    <span className="mx-2">{getCurrentDateRange()}</span>
                                    <button className="text-xl px-2 " onClick={handleNextPage}><img src='chevron-right.svg'/></button>
                                </div>
                            </div>

                            <div className="space-y-4 scrollable">
                                {displayedSchedules.map((schedule) => (
                                    <div key={schedule.id}>
                                        <h4 className="text-lg font-semibold">{schedule.day}, {getMonthName(schedule.date)} {getDateNumber(schedule.date)}</h4>
                                        <div className="flex justify-between items-center bg-[var(--input)] p-4 rounded-lg shadow mt-2 border-mt-flex">
                                            <div className="flex items-center border-flex-item-center">
                                                <img src={getTimeOfDayIcon(schedule.start_time)} alt="icon" className="mr-2" />
                                                <div className='para-font'>
                                                    <p className="font-semibold">{schedule.start_time} - {schedule.end_time} {schedule.timezone}</p>
                                                    <p>{schedule.service.service_name}</p>
                                                    <p >{schedule.instructor.name}</p>
                                                    <a href="#" className="text-sm text-primary">&gt;Read more about this class</a>
                                                </div>
                                            </div>
                                            <button className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded" onClick={() => handleBookClass(schedule)}>Book this class</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='center-container'>
                        <div className="calendar">
                            <div className="cleander-header">
                                <span onClick={() => handleMonthChange(-1)}><img src='images/chevron-left.svg'/></span>
                                <span className="month">{getMonthName(new Date(currentYear, currentMonth))} {currentYear}</span>
                                <span onClick={() => handleMonthChange(1)}><img src='chevron-right.svg'/></span>
                            </div>
                            <div className="days">
                                {Array.from({ length: 7 }, (_, i) => (
                                    <div key={i} className="day-name">{getDayName(i)}</div>
                                ))}
                                {calendarDays.map((day, index) => (
                                    <div key={index} className="day">
                                        {day && <div className="date">{day}</div>}
                                        {day && schedules.filter(schedule => new Date(schedule.date).getDate() === day && new Date(schedule.date).getMonth() === currentMonth).map(filteredSchedule => (
                                            <div key={filteredSchedule.id} className="event">
                                                <div className="flex-items-center-first" onClick={() => handleBookClass(filteredSchedule)}>
                                                    <img src={getTimeOfDayIcon(filteredSchedule.start_time)} alt="icon" className="mr-2" />
                                                    <div>
                                                       <p>{filteredSchedule.start_time} <span>with {filteredSchedule.instructor.name} </span></p>  
                                                        <h5>{filteredSchedule.service.service_name}</h5> 
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                    )}
                </div>
               
            </div>
           <Header />
        </div>
    );
}

export default Schedule;

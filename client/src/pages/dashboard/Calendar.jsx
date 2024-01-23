import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';

export const Calendar = ({ jobs }) => {
    const qc = useQueryClient();
    const [ jobList, setJobList ] = useState([]);
    const [ days, setDays ] = useState([]);
    const today = dayjs(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        setJobList(jobs.filter(job => job.status !== 'Canceled'));
        setDays(() => {
            const days = [];
            for (let i = 0; i < 5; i++) {
                days.push({
                    name: dayjs(today).add(i, 'day').format('dddd'),
                    number: dayjs(today).add(i, 'day').format('DD')
                });
            }
            return days;
        });
    }, [ jobs ]);

    // EVENT LISTENERS
    const selectJob = (job) => {
        qc.setQueryData('submissionType', 'edit');
        qc.setQueryData('selectedJob', job);
        qc.setQueryData('selectedCustomer', job.customer);
    };

    return (
        <section className={'section-calendar'}>
            <h2>5 DAY SCHEDULE</h2>
            <div className={'calendar'}>
                {days.map(day => (
                    <div className={'calendar-day'} key={day.number}>
                        <h3>
                            <span>{day.name}</span>
                            <span>{day.number}</span>
                        </h3>

                        <div>
                            {jobList.filter(job => (
                                dayjs(job.serviceDate).format('dddd') === day.name &&
                                dayjs(job.serviceDate) > today.subtract(1, 'day') &&
                                dayjs(job.serviceDate) < today.add(5, 'day')
                            )).sort((job1, job2) => (
                                job1.customer?.address?.city.charCodeAt(0) - job2.customer?.address?.city.charCodeAt(0)
                            )).map(job => (
                                <p key={job._id} className={'calendar-job'} onClick={async () => {
                                    await selectJob(job);
                                    navigate('/jobs');
                                }}>
                                    <a>
                                        {job.customer?.businessName}<br/>
                                        <span>{job.customer?.address?.city}</span>
                                    </a>
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
import { Notifications } from './Notifications';
import { Revenue } from './Revenue';
import { Calendar } from './Calendar';
import { useJobs } from '../jobs/hooks/useJobs';
import { useParts } from '../inventory/hooks/useParts';
import './style.scss';

export const Dashboard = () => {
    const { jobs } = useJobs();
    const { parts } = useParts();

    return (
        <main id={'dashboard'}>
            <section id={'top-section'}>
                <Notifications jobs={jobs} parts={parts}/>
                <Revenue jobs={jobs}/>
            </section>

            <section>
                <Calendar jobs={jobs}/>
            </section>
        </main>
    );
};
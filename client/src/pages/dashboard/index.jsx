import {Notifications} from './Notifications';
import {Revenue} from './Revenue';
import {Calendar} from './Calendar';
import './style.scss';
import { useJobs } from '../jobs/hooks/useJobs';
import { useParts } from '../inventory/hooks/useParts';

export const Dashboard = () => {
    const { jobs } = useJobs();
    const { parts } = useParts();

    return (
        <main>
            <section id={'top-section'}>
                <Notifications jobs={jobs} parts={parts} />
                <Revenue jobs={jobs} />
            </section>

            <section>
                <Calendar jobs={jobs} />
            </section>
        </main>
    )
}
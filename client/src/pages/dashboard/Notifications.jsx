import { Link } from 'react-router-dom';

export const Notifications = ({ jobs, parts }) => {
    return (
        <section className={'section-notifications'}>
            <h2>NOTIFICATIONS</h2>
            <div className={'notifications'}>
                {
                    jobs?.length &&
                    <Link className={'notice'} to={'/jobs'}>
                        There are new jobs that need to be scheduled.
                    </Link>
                }
                {
                    parts?.length &&
                    <Link className={'notice'} to={'/inventory'}>
                        Some parts need to be re-ordered.
                    </Link>
                }
                {
                    !parts?.length && !jobs?.length &&
                    <p className={'empty-notifications'}>
                        ** You're all caught up. **
                    </p>
                }
            </div>
        </section>
    );
};
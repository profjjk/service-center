import { useQuery } from 'react-query';
import { API, getStoredUser } from '../../../utils';

const getJobs = async (companyId) => {
    try {
        if (companyId) {
            const { data } = await API.getJobs(companyId);
            return data;
        }
    } catch (err) {
        console.error(err);
    }
};

export const useJobs = () => {
    const companyId = getStoredUser()?.company;

    const { data: jobs } = useQuery(
        'jobs',
        () => getJobs(companyId),
        {
            enabled: !!companyId,
            initialData: []
        }
    );

    return { jobs };
};
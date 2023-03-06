import { API } from '../../../utils';
import { useQuery, useQueryClient } from 'react-query';
import { getStoredUser } from '../../../utils';

const getJobs = async (companyId) => {
    try {
        if (companyId) {
            const { data } = await API.getJobs(companyId);
            return data;
        }
    } catch(err) { console.error(err) }
}

export const useJobs = () => {
    const qc = useQueryClient();
    const companyId = getStoredUser()?.company;

    const { data: jobs } = useQuery(
        'jobs',
        () => getJobs(companyId),
        {
            enabled: !!companyId,
            initialData: [],
        }
    )

    const createJob = () => {

    }

    const editJob = () => {

    }

    const deleteJob = () => {

    }

    return { jobs, createJob, editJob, deleteJob };
}
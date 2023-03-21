import { useQuery } from 'react-query';
import { API, getStoredUser } from '../../../utils';

const getParts = async (companyId) => {
    try {
        if (companyId) {
            const { data } = await API.getParts(companyId);
            return data;
        }
    } catch(err) { console.error(err) }
}

export const useParts = () => {
    const companyId = getStoredUser()?.company;

    const { data: parts } = useQuery(
        'parts',
        () => getParts(companyId),
        {
            enabled: !!companyId,
            initialData: [],
        }
    )

    return { parts };
}
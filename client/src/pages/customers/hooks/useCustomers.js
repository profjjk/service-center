import { API } from '../../../utils';
import { useQuery, useQueryClient } from 'react-query';
import { getStoredUser } from '../../../utils';

const getCustomers = async (companyId) => {
    try {
        if (companyId) {
            const { data } = await API.getCustomers(companyId);
            return data;
        }
    } catch(err) { console.error(err) }
}

export const useCustomers = () => {
    const qc = useQueryClient();

    return useQuery(
        'customers',
        () => getCustomers(getStoredUser()?.company),
        {
            enabled: !!getStoredUser(),
            initialData: [],
        }
    )
}
import { API } from '../../utils/api';
import { useQuery, useQueryClient } from 'react-query';
import { getStoredUser } from '../../utils/storage';

const getCustomers = async (companyId) => {
    try {
        if (companyId) {
            const { data } = await API.getCustomers(companyId);
            // return data ? data : [];
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
            enabled: !!getStoredUser()
        }
    )
}
import { useQuery } from 'react-query';
import { API, getStoredUser } from '../../../utils';

const getCustomers = async (companyId) => {
    try {
        if (companyId) {
            const { data } = await API.getCustomers(companyId);
            return data;
        }
    } catch (err) {
        console.error(err);
    }
};

export const useCustomers = () => {
    const companyId = getStoredUser()?.company;

    const { data: customers } = useQuery(
        'customers',
        () => getCustomers(companyId),
        {
            enabled: !!getStoredUser(),
            initialData: []
        }
    );

    return { customers };
};
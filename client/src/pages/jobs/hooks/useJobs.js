import { API } from '../../../utils';
import { useQuery } from 'react-query';
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
    const companyId = getStoredUser()?.company;

    const { data: jobs } = useQuery(
        'jobs',
        () => getJobs(companyId),
        {
            enabled: !!companyId,
            initialData: [],
        }
    )

    const formatData = (formData, customerId) => {
        const formattedJob = {
            company: companyId,
            customer: customerId,
            serviceDate: formData.serviceDate.trim(),
            invoiceNumber: formData.invoiceNumber.trim(),
            issueNotes: formData.issueNotes,
            serviceNotes: formData.serviceNotes,
            status: formData.status,
            totalBill: parseFloat(formData.totalBill),
            isPaid: formData.isPaid === 'on'
        }

        const formattedCustomer = {
            company: companyId,
            businessName: formData.businessName,
            contactName: formData.contactName,
            phone: formData.phone,
            address: {
                street1: formData.street1,
                street2: formData.street2,
                city: formData.city,
                state: formData.state,
                zipcode: formData.zipcode
            }
        }
        return { formattedJob, formattedCustomer }
    }

    return { jobs, formatData };
}
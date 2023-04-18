import { useMutation, useQueryClient } from 'react-query';
import { API } from '../../utils';

export const withMutation = (Component) => (props) => {
    const qc = useQueryClient();

    // JOB MUTATIONS
    const addJob = useMutation((job) => API.createJob(job), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });
    const editJob = useMutation((job) => API.updateJob(job.id, job.data), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });
    const removeJob = useMutation((id) => API.deleteJob(id), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });
    const clearJobs = useMutation((customerId) => API.deleteJobsByCustomer(customerId), {
        onSuccess: () => {
            qc.invalidateQueries('jobs');
        }
    });

    // CUSTOMER MUTATIONS
    const addCustomer = useMutation((customer) => API.createCustomer(customer), {
        onSuccess: () => {
            qc.invalidateQueries('customers');
        }
    });
    const editCustomer = useMutation((customer) => API.updateCustomer(customer.id, customer.data), {
        onSuccess: () => {
            qc.invalidateQueries('customers');
        }
    });
    const removeCustomer = useMutation((id) => API.deleteCustomer(id), {
        onSuccess: () => {
            qc.invalidateQueries('customers');
        }
    });
    const clearCustomers = useMutation((companyId) => API.deleteCustomersByCompany(companyId), {
        onSuccess: () => {
            qc.invalidateQueries('customers');
        }
    });

    // PART MUTATIONS
    const addPart = useMutation(part => API.createPart(part), {
        onSuccess: () => {
            qc.invalidateQueries('parts');
        }
    });
    const editPart = useMutation(part => API.updatePart(part.id, part.data), {
        onSuccess: () => {
            qc.invalidateQueries('parts');
        }
    });
    const removePart = useMutation(id => API.deletePart(id), {
        onSuccess: () => {
            qc.invalidateQueries('parts');
        }
    });

    return (
        <Component
            {...props}
            mutateJob={{ add: addJob, edit: editJob, remove: removeJob, clear: clearJobs }}
            mutateCustomer={{ add: addCustomer, edit: editCustomer, remove: removeCustomer, clear: clearCustomers }}
            mutatePart={{ add: addPart, edit: editPart, remove: removePart }}
        />
    );
};
import { useQueryClient, useMutation } from 'react-query';
import { API } from '../../utils';

export const withMutation = (Component) => (props) => {
    const qc = useQueryClient();

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
        },
    });
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
            mutateJob={{create: addJob, edit: editJob, delete: removeJob }}
            mutateCustomer={{ create: addCustomer, edit: editCustomer, delete: removeCustomer }}
            mutatePart={{ create: addPart, edit: editPart, delete: removePart }}
        />
    )
}
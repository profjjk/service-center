const formatJob = (formData) => {
    return {
        serviceDate: formData.serviceDate,
        invoiceNumber: formData.invoiceNumber,
        issueNotes: formData.issueNotes,
        serviceNotes: formData.serviceNotes,
        status: formData.status,
        totalBill: parseFloat(formData.totalBill),
        isPaid: formData.isPaid === 'on'
    };
};

const formatCustomer = (formData) => {
    return {
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
    };
};

const formatPart = (formData) => {
    return {
        partNumber: formData.partNumber,
        description: formData.description,
        stock: parseInt(formData.stock)
    };
};

export {
    formatJob,
    formatCustomer,
    formatPart
};
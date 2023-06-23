import dayjs from 'dayjs';

const sortByServiceDate = (jobs) => {
    for (let i = 0; i < jobs.length; i++) {
        if (dayjs(jobs[i].serviceDate).unix() > dayjs(jobs[0].serviceDate).unix() ||
            jobs[i].serviceDate === '') {
            jobs.unshift(jobs.splice(i, 1)[0]);
        } else {
            for (let j = 1; j < i; j++) {
                if (dayjs(jobs[i].serviceDate).unix() < dayjs(jobs[j - 1].serviceDate).unix() &&
                    dayjs(jobs[i].serviceDate).unix() > dayjs(jobs[0].serviceDate).unix()) {
                    jobs.splice(j, 0, jobs.splice(i, 1)[0]);
                }
            }
        }
    }
    return jobs;
};

const sortPendingToTop = (jobs) => {
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].status === 'Pending') {
            jobs.unshift(jobs.splice(i, 1)[0]);
        }
    }
    return jobs;
};

const sortByStockStatus = (parts) => {
    for (let i = 0; i < parts.length; i++) {
        if (parts[i]?.stock <= parts[i]?.minimum) {
            parts.unshift(parts.splice(i, 1)[0]);
        }
    }
    return parts;
};


export { sortPendingToTop, sortByServiceDate, sortByStockStatus };
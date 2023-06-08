const { connect, Types } = require('mongoose');
const cron = require('node-cron');
const dayjs = require('dayjs');
require('dotenv').config();

const db = require('../models');
const demoCustomers = require('./seed_data/demoCustomers.json');
const demoJobs = require('./seed_data/demoJobs.json');
const demoParts = require('./seed_data/demoParts.json');
const companyId = '640420587edb9c434d52956d';

const insertCustomers = async (demoCustomers, companyId) => {
    demoCustomers.forEach((customer) => customer.company = new Types.ObjectId(companyId));
    try {
        await db.Customer.deleteMany({ company: companyId });
        return db.Customer.collection.insertMany(demoCustomers);
    } catch (err) {
        console.error(err);
    }
};

const insertJobs = async (demoJobs, companyId, customerArray) => {
    demoJobs.forEach((job, index) => {
        job.company = new Types.ObjectId(companyId);
        if (index < 3) {
            job.customer = new Types.ObjectId(customerArray.insertedIds[0]);
        } else {
            job.customer = new Types.ObjectId(customerArray.insertedIds[1]);
        }
    });
    demoJobs[0].serviceDate = dayjs().subtract(500, 'day').format('YYYY-MM-DD');
    demoJobs[1].serviceDate = dayjs().subtract(50, 'day').format('YYYY-MM-DD');
    demoJobs[2].serviceDate = dayjs().add(2, 'day').format('YYYY-MM-DD');
    demoJobs[3].serviceDate = dayjs().subtract(380, 'day').format('YYYY-MM-DD');
    demoJobs[4].serviceDate = dayjs().subtract(22, 'day').format('YYYY-MM-DD');

    try {
        await db.Job.deleteMany({ company: companyId });
        return db.Job.collection.insertMany(demoJobs);
    } catch (err) {
        console.error(err);
    }
};

const insertParts = async (demoParts, companyId) => {
    demoParts.forEach((part) => part.company = new Types.ObjectId(companyId));
    try {
        await db.Part.deleteMany({ company: companyId });
        return db.Part.collection.insertMany(demoParts);
    } catch (err) {
        console.error(err);
    }
};

const insertDemoData = async () => {
    try {
        const customers = await insertCustomers(demoCustomers, companyId);
        await insertJobs(demoJobs, companyId, customers);
        await insertParts(demoParts, companyId);
    } catch (err) {
        console.log('ERROR HAPPENED');
        console.error(err);
        process.exit(1);
    }
};

cron.schedule('0 0 * * *', () => {
    console.log('CRON RUNNING');
    connect(process.env.MONGODB_URI);
    insertDemoData().then(() => process.exit(0));
});
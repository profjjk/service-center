const { Types } = require('mongoose');
const cron = require('node-cron');
const dayjs = require('dayjs');
require('dotenv').config();

const db = require('../models');
const demoCustomers = require('./seed_data/demoCustomers.json');
const demoJobs = require('./seed_data/demoJobs.json');
const demoParts = require('./seed_data/demoParts.json');
const companyId = '640420587edb9c434d52956d';

const insertCustomers = async (demoCustomers, companyId) => {
    // assign company id and customer id to each customer
    demoCustomers.forEach((customer) => customer.company = new Types.ObjectId(companyId));
    try {
        await db.Customer.deleteMany({ company: companyId });
        return db.Customer.collection.insertMany(demoCustomers);
    } catch (err) {
        console.error(err);
    }
};

const insertJobs = async (demoJobs, companyId, customerArray) => {
    // assign company id and customer id to each job
    demoJobs.forEach((job) => job.company = new Types.ObjectId(companyId));

    // assign customer id to each job
    demoJobs[0].customer = new Types.ObjectId(customerArray.insertedIds[0]);
    demoJobs[1].customer = new Types.ObjectId(customerArray.insertedIds[0]);
    demoJobs[2].customer = new Types.ObjectId(customerArray.insertedIds[0]);
    demoJobs[3].customer = new Types.ObjectId(customerArray.insertedIds[1]);
    demoJobs[4].customer = new Types.ObjectId(customerArray.insertedIds[1]);
    demoJobs[5].customer = new Types.ObjectId(customerArray.insertedIds[1]);
    demoJobs[6].customer = new Types.ObjectId(customerArray.insertedIds[2]);
    demoJobs[7].customer = new Types.ObjectId(customerArray.insertedIds[3]);
    demoJobs[8].customer = new Types.ObjectId(customerArray.insertedIds[4]);
    demoJobs[9].customer = new Types.ObjectId(customerArray.insertedIds[5]);

    // assign service dates to jobs based on current day
    demoJobs[0].serviceDate = dayjs().subtract(20, 'day');
    demoJobs[1].serviceDate = dayjs().subtract(10, 'day');
    demoJobs[2].serviceDate = dayjs().add(2, 'day');
    demoJobs[3].serviceDate = dayjs().subtract(15, 'day');
    demoJobs[4].serviceDate = dayjs().subtract(5, 'day');
    demoJobs[6].serviceDate = dayjs().add(3, 'day');
    demoJobs[7].serviceDate = dayjs().add(1, 'day');
    demoJobs[8].serviceDate = dayjs().add(5, 'day');
    demoJobs[9].serviceDate = dayjs().add(4, 'day');

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

exports.runUpdates = () => {
    // refresh demo data every Sunday
    const updateDemoData = cron.schedule('0 12 * * 0', async () => {
        try {
            const customers = await insertCustomers(demoCustomers, companyId);
            await insertJobs(demoJobs, companyId, customers);
            await insertParts(demoParts, companyId);
            console.log(`Demo dated has been refreshed as of ${dayjs().format('MMM.DD.YYYY')} at ${dayjs().format('h:mma')}`);
        } catch (err) {
            console.error(err);
        }
    });
    updateDemoData.start();
};

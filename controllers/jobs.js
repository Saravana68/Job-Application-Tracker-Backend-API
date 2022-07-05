const Jobs = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const {NotFoundError,BadRequestError } = require('../errors')

/* Create new Job */
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

/* Fetch All Jobs created by user */
const getAllJobs = async (req, res) => {
    const jobs = await Jobs.find({ createdBy: req.user.userId }).sort('createdBy');
    res.status(StatusCodes.OK).json({ jobs , count : jobs.length });
}

/* Fetching one particular document  */
const getJob = async (req, res) => {  
    const userId = req.user.userId;
    const { id: jobId } = req.params;

    const job = await Jobs.findOne({
        createdBy: userId,
        _id : jobId
    })

    if (!job)
        throw new NotFoundError(`Document not found with given objectId ${jobId}`);   
    res.status(StatusCodes.OK).json({ job });
}

/* Update one particular job */
const updateJob = async(req, res) => {
    const userId = req.user.userId;
    const { id: jobId } = req.params;
    const { company, position } = req.body;

    if (company === '' || position === '')
        throw new BadRequestError('Company or Position cant be empty');

    const job = await Jobs.findByIdAndUpdate({
        createdBy: userId,
        _id : jobId
    }, req.body, {
        runValidators: true,
        new : true
    })
    if (!job)
        throw new NotFoundError(`Document not found with given objectId ${jobId}`);   
    
    res.status(StatusCodes.OK).json({job});
}

const deleteJob = async (req, res) => {
    const userId = req.user.userId;
    const { id: jobId } = req.params;

    const job = await Jobs.findByIdAndRemove({
        createdBy: userId,
        _id : jobId
    })
    if (!job)
        throw new NotFoundError(`Document not found with given objectId ${jobId}`);    
    res.status(StatusCodes.OK).json({success : true});

}


module.exports = {
    createJob,
    getJob,
    getAllJobs,
    updateJob,
    deleteJob   
}

const Job = require('../models/Job')
const { BadRequestError, NotFoundError } = require('../errors')
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(200).json({jobs})
}
const getJob = async (req, res) => {
    const {user:{userId},params:{id:jobId}} = req
    const job = await Job.findOne({_id:jobId,createdBy:userId})
    if (!job) {
        throw new NotFoundError('no job with id')
    }
    res.status(200).json({job})
}
const createJob = async (req, res) => {
    const job = await Job.create({...req.body,createdBy:req.user.userId})
    res.status(201).json({job})
}
const updateJob =async (req, res) => {
    const {
        user:{userId},
        params:{id:jobId},
        body:{company,position}
    } = req
    if (company==='' || position==='') {
        throw new BadRequestError('company or position not empty')
    }
    const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
    if (!job) {
        throw new NotFoundError('no job with id')
    }
    res.status(200).send({job})
}
const deleteJob =async (req, res) => {
    const {
        user:{userId},
        params:{id:jobId},
    } = req
    const job = await Job.findOneAndDelete({_id:jobId,createdBy:userId})
    if (!job) {
        throw new NotFoundError('no job with id')
    }
    res.sendStatus(200)
}
module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
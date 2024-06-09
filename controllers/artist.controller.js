const { PrismaClient } = require('@prisma/client');
const ClientError = require('../errors/ClientError');
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

const getAllartists = async (req, res, next) => {
    try {
        const allartists = await prisma.user.findMany()

        return res.status(200).json({
            message: 'Success',
            data: allartists,
         })
    } catch (error) {
       return next(error) 
    }
}

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const isartists = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (isartists) {
            throw new ClientError('artist sudah terdaftar')
        }

        const newPassword = await bcrypt.hash(password, 10)

        const newartist = await prisma.user.create({
            data: {
                email,
                password: newPassword,
            },
        })

        return res.status(201).json({
            message: 'User berhasil ditambahkan',
            data: newUser,
        })

    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllartists,
    register,
}
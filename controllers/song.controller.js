const { PrismaClient } = require('@prisma/client');
const NotFoundError = require('../errors/NotFoundError');

const prisma = new PrismaClient();

const getAllsongs = async (req, res, next) => {
    try {
        const { q } = req.query;

        const allsongs = await prisma.karyawa.findMany({
            include: {
                proyek: true,
            },
            where: {
                email: {
                    contains: q,
                    mode: 'insensitive',
                },
            },
        });

        return res.status(200).json({
            message: 'Success',
            data: allsongs,
         });
    } catch (error) {
       return next(error); 
    }
};

const getsongsById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await prisma.song.findUnique({
            where: {
                id,
            },
            include: {
                proyek: true,
            }
        });

        if (!song) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        return res.status(200).json({
            message: 'Success',
            data: song,
        }); 
    } catch (error) {
        return next(error);
    }
};

const addsongs = async (req, res, next) => {
    try {
        const song = req.body;

        const newsongs = await prisma.song.create({
            data: song,
        });

        return res.status(201).json({
            message: 'Lagu berhasil ditambahkan',
            data: newsongs,
        });

    } catch (error) {
        return next(error);
    }
};

const updatesongs = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = req.body;

        const updatedsongs = await prisma.song.update({
            where: { id },
            data: song,
        });

        return res.status(200).json({
            message: 'Lagu berhasil diperbarui',
            data: updatedsongs,
        });
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return next(new NotFoundError('Lagu tidak ditemukan'));
        }
        return next(error);
    }
};

const deletesongs = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.song.delete({
            where: { id },
        });

        return res.status(200).json({
            message: 'Lagu berhasil dihapus',
        });
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return next(new NotFoundError('Lagu tidak ditemukan'));
        }
        return next(error);
    }
};

module.exports = {
    getAllsongs, 
    getsongsById, 
    addsongs,
    updatesongs,
    deletesongs
};
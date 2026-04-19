
import sequelize from "../models/database.js"

const getAll = async () => {
    const resultado = await sequelize.models.Reservas.findAll({
        attributes: [
            'Id',
            'Dni',
            'FechaIngreso',
            'FechaSalida',
            'TipoEstadia',
            'Huespedes'
        ],
        order: [['FechaIngreso', 'ASC']]
    })
    return resultado.map(p => {
        return {
            Id: p.dataValues.Id,
            Dni: p.dataValues.Dni,
            FechaIngreso: p.dataValues.FechaIngreso,
            FechaSalida: p.dataValues.FechaSalida,
            TipoEstadia: p.dataValues.TipoEstadia,
            Huespedes: p.dataValues.Huespedes
        }
    })
}

const create = async (reserva) => {
    const resultado = await sequelize.models
        .Reservas.create({
            Dni: reserva.Dni,
            FechaIngreso: reserva.FechaIngreso,
            FechaSalida: reserva.FechaSalida,
            TipoEstadia: reserva.TipoEstadia,
            Huespedes: reserva.Huespedes
        })
    return {
        Id: resultado.dataValues.Id,
    };

}

const updateReserva = async (reservaEdit) => {
    console.log(reservaEdit)
    try {
        const reserva = await sequelize.models.Reservas.findOne({
            where: {
                Id: reservaEdit.Id
            },
        });

        if (!reserva) {
            throw new ResourceNotFound("Reserva no encontrada");
        }

        await sequelize.models.Reservas.update(
            {
                Dni: reservaEdit.Dni,
                FechaIngreso: reservaEdit.FechaIngreso,
                FechaSalida: reservaEdit.FechaSalida,
                TipoEstadia: reservaEdit.TipoEstadia,
                Huespedes: reservaEdit.Huespedes
            },
            {
                where: { Id: reservaEdit.Id }
            }
        );

        return { Id: reservaEdit.Id };
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la reserva');
    }
};


const deleteReserva = async (idReserva) => {
    try {
        const resultado = await sequelize.models.Reservas.destroy({
            where: {
                Id: idReserva.Id
            }
        })
        return { message: 'Cancha eliminada exitosamente' };
    }
    catch (error) {
        throw new Error('Error al eliminar la Reserva')
    }
}

export default {
    getAll,
    create,
    deleteReserva,
    updateReserva
}
const { localhost } = require('../database');

module.exports = {
    async show(_req, res) {
        try {
            const getRecords = await localhost.raw(`select * from clients`)
            return res.json(getRecords[0]);
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: 'falha em buscar registros' });
        }
    },

    async create(_req, res) {
        const { name, code, date, plane } = _req.body;

        try {
            const createClient = await localhost("clients").insert({ name, code, date, plane });
            return res.json(createClient);

        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: 'falha ao adicionar registros' });
        }
    },

    async edit(_req, res) {
        const { name, code, date, plane, oldCode } = _req.body;

        try {
            const editClient = await localhost("clients").where({ code: oldCode })
                .update({ name: name, code: code, date: date, plane: plane })
            return res.json(editClient)
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: 'falha ao editar registros' })
        }
    },

    async trash(_req, res) {
        const { code } = _req.body;

        try {
            const deleteClient = await localhost("clients").where({ code: code }).del();
            return res.json(deleteClient);

        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: 'falha ao remover registros' });
        }
    }

}
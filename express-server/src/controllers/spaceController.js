import Location from '../models/Location';
import Space from '../models/Space';

Space.belongsTo(Location, {
    as: 'location',
    foreignKey: 'location_id'
});

const errorHandler = (res, error) => res.status(400).send(error.errors);

class SpaceController {

    static postSpace(req, res, next) {
        Space.create(req.body)
            .then(result => {
                if(result) {
                    res.status(201).send(result);
                } else {
                    res.status(404).send();
                }
                next();
            })
            .catch(error => errorHandler(res, error));
    }

    static editSpace(req, res, next) {
        const id = req.params.space_id;

        Space.update(req.body, {
            returning: true, where: { id }
        })
        .then(() => {
            Space.findOne({ where: { id } })
            .then(space => {
                if (space) {
                    res.status(200).send(space);
                } else {
                    res.status(404).send();
                }
                next();
            })
        })
        .catch(error => errorHandler(res, error));
    }

    static deleteSpace(req, res, next) {
        const id = req.params.space_id;

        Space.destroy({ where: { id } })
        .then(result => {
            if (result) {
                res.sendStatus(204);
            } else {
                res.status(404).send();
            }
            next();
        })
        .catch(error => errorHandler(res, error));
    }

    static getAllSpaces(req, res, next) {
        const id = req.params.location_id;
        Space.findAll({ where: { location_id } })
        .then(spaces => {
            if(spaces) {
                res.status(200).send(spaces);
            }
            else {
                res.status(404).send();
            }
            next();
        })
        .catch(errorHandler);
    }

    static getSingleSpace(req, res, next) {
        const id = req.params.space_id;

        Space.findOne({ where: { id } })
        .then(space => {
            if (space) {
                res.status(200).send(space);
            } else {
                res.status(404).send();
            }
            next();
        })
        .catch(error => errorHandler(res, error));
    }

}

module.exports = SpaceController;
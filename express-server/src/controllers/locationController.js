import Location from '../models/Location';
import Space from '../models/Space';

Location.hasMany(Space, {
    as: 'spaces',
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
});

Space.belongsTo(Location, {
    as: 'location',
    foreignKey: 'location_id'
});

const errorHandler = (res, error) => res.status(400).send(error.errors);

class LocationController {
    constructor(socket) {
        this.socket = socket;
    }

    static postLocation(req, res, next) {
        Location.create(req.body)
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

    static editLocation(req, res, next) {
        const id = req.params.location_id;

        Location.update(req.body, {
            returning: true, where: { id }
        })
            .then(() => {
                Location.findOne({
                    where: { id },
                    include: [{ model: Space, as: "spaces" }]
                })
                    .then(location => {
                        if (location) {
                            res.status(200).send(location);
                        } else {
                            res.status(404).send();
                        }
                        next();
                    })
            })
            .catch(error => errorHandler(res, error));
    }

    static deleteLocation(req, res, next) {
        const id = req.params.location_id;

        Location.destroy({ where: { id } })
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

    static getAllLocations(req, res, next) {
        Location.findAll({
            include: [{ model: Space, as: "spaces" }]
        })
            .then(locations => {
                if(locations) {
                    res.status(200).send(locations);
                }
                else {
                    res.status(404).send();
                }
                next();
            })
            .catch(errorHandler);
    }

    static getSingleLocation(req, res, next) {
        const id = req.params.location_id;

        Location.findOne({
            where: { id },
            include: [{ model: Space, as: "spaces" }]
        })
            .then(location => {
                if (location) {
                    res.status(200).send(location);
                } else {
                    res.status(404).send();
                }
                next();
            })
            .catch(error => errorHandler(res, error));
    }

    static getSingleLocationSpaces(req, res, next) {
        const id = req.params.location_id;

        Location.findOne({
            where: { id },
            include: [{ model: Space, as: "spaces" }]
        })
            .then(location => {
                if(location) {
                    res.status(200).send(location.spaces);
                } else {
                    res.status(404).send();
                }
                next();
            })
            .catch(error => errorHandler(res, error));
    }
}

module.exports = LocationController;

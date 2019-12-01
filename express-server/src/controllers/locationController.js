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

    static getAllLocations(req, res, next) {
        Location.findAll({
            include: [{ model: Space, as: "spaces" }]
        })
        .then(locations => {
            res.status(200).send(locations);
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
            res.status(200).send(location);
            next();
        })
        .catch(error => errorHandler(res, error));
    }
}

module.exports = LocationController;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';
import { addVehicle, deleteVehicle, getVehicles, changeVehicleSpeed } from '../actions/vehiclesActions';
import PropTypes from 'prop-types';

class Vehicles extends Component {

    state = {
        speedChangeDiff: 5
    }

    // Get vehicles when component has mounted
    componentDidMount() {
        this.props.getVehicles();
    }

    addVehicle = () => {

        // Prepare new vehicle object
        let newVehicle = {};
        newVehicle.name=prompt("Name?");
        newVehicle.type=prompt("Type?");
        newVehicle.color=prompt("Color?");
        newVehicle.make=prompt("Make?");
        newVehicle.model=prompt("Model?");
        newVehicle.noOfWheels=prompt("No. of wheels?");
        newVehicle.maxSpeed=prompt("Max speed?");

        this.props.addVehicle(newVehicle);
    }

    decreaseSpeed = (id) => {
        this.props.changeVehicleSpeed(id, -this.state.speedChangeDiff)
    }

    increaseSpeed = (id) => {
        this.props.changeVehicleSpeed(id, this.state.speedChangeDiff)
    }

    render() {
        const speedButtonClasses = 'ml-3';
        const { vehicles } = this.props.vehicle;
        return (
            <div>
                <ListGroup className='mb-3'>
                    {vehicles.map(vehicle => 
                        <ListGroupItem key={vehicle._id}>
                            <Button
                                outline
                                color='danger'
                                size='sm'
                                className='mr-2'
                                onClick={this.props.deleteVehicle.bind(this, vehicle._id)}
                            >&times;</Button>
                            {vehicle.name}
                            <Badge className='ml-2' color='secondary'>{vehicle.speed} km/h</Badge>
                            <Button
                                outline 
                                color='warning' 
                                size='sm' 
                                className={speedButtonClasses} 
                                onClick={this.decreaseSpeed.bind(this, vehicle._id)}
                            >Slow down</Button>
                            
                            <Button 
                            outline 
                            color='success' 
                            size='sm' 
                            className={speedButtonClasses} 
                            onClick={this.increaseSpeed.bind(this, vehicle._id)}
                            >Speed up</Button>
                        </ListGroupItem>
                    )}
                </ListGroup>
                <Button
                    color='light'
                    onClick={this.addVehicle}
                >Add Vehicle</Button>
            </div>
        )
    }
}

Vehicles.propTypes = {
    vehicle: PropTypes.object.isRequired,
    addVehicle: PropTypes.func.isRequired,
    deleteVehicle: PropTypes.func.isRequired,
    getVehicles: PropTypes.func.isRequired,
    changeVehicleSpeed: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    vehicle: state.vehicles
});

export default connect(mapStateToProps, { addVehicle, deleteVehicle, getVehicles, changeVehicleSpeed })(Vehicles);

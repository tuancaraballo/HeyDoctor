import React, {Component} from 'react';

import {Container, Grid, Button} from'semantic-ui-react'
import DoctorPatients from '../components/DoctorPatients';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchDoctors, fetchAppointmentByDoctor} from "../actions/actions";
import {Image, Menu} from 'semantic-ui-react'
import {Route, Switch} from 'react-router-dom';

class HeyDoctor extends Component{
    constructor(props){
        super(props);
        this.state = { activeItem: 'account', selectedDoctorId:''}


    }
    handleItemClick = (doctorId, name) => {
        this.setState({ activeItem: name, selectedDoctorId :doctorId});

    };

    componentDidMount(){
        this.props.fetchDoctors();
    }

    componentDidUpdate(prevProps,prevState){
        debugger;
        if(prevProps.doctorIds !== this.props.doctorIds){
            this.props.doctorIds.forEach(doctorId=> {
                this.props.fetchAppointmentByDoctor(doctorId);
            });
        }
    }

    displaySideBar = (activeItem) => {
        let {doctors} = this.props;

        return Object.entries(doctors).map(([doctorId, value]) => {
            let {firstName, lastName} = value;
            let name = `${firstName} ${lastName}`;

            return (
                <Menu.Item
                    key={doctorId}
                    name={name}
                    active={activeItem === name}
                    onClick={(e) => this.handleItemClick(doctorId, name)}
                />
            )
        })
    };

    render(){
        const { activeItem, selectedDoctorId } = this.state;
        const {appointments, doctors} = this.props;

        let selectedAppointments = appointments[selectedDoctorId];
        let doctorInfo = doctors[selectedDoctorId];
        return(
            <Grid  style={{paddingTop:'3em'}}>
                <Grid.Column width={3}>
                    <Menu secondary vertical>
                        {this.displaySideBar(activeItem)}
                    </Menu>
                    <Button size="tiny" color={"blue"}> Log out</Button>

                </Grid.Column>
                <Grid.Column width={9}>
                    <DoctorPatients appointments={selectedAppointments} doctorInfo={doctorInfo}/>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = ({doctorsReducer, fetchAppsReducers}) => {
    let doctorIds = Object.keys(doctorsReducer);
    return {
        doctors:doctorsReducer,
        doctorIds,
        appointments:fetchAppsReducers,
    }
};

const dispatchMapToProps = (dispatch) => {
    return bindActionCreators({
        fetchDoctors,
        fetchAppointmentByDoctor,
    }, dispatch);
};

export default connect(mapStateToProps, dispatchMapToProps)(HeyDoctor);

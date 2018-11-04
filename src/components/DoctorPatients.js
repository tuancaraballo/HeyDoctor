import React, {Component} from 'react'
import {Table} from 'semantic-ui-react';
import PropTypes from "prop-types";

class DoctorPatients extends Component {
    constructor(props){ // constructor is unnecessary, dumbify it later
        super(props);
    }

    displayAppointments = (appointments) => {
      let count = 0;
      if(appointments && appointments.length > 0){
          return appointments.map(appointment => {
              count++;
              let {name, time, kind} = appointment;
              return (
                  <Table.Row>
                      <Table.Cell>{count}</Table.Cell>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{time}</Table.Cell>
                      <Table.Cell>{kind}</Table.Cell>
                  </Table.Row>
              )
          });
      }
    };

    displayPatientsInfo = (appointments) => {
      if(!appointments || appointments.length == 0){
          return <h2>No Patients info available</h2>
      } else{
          return(
              <Table stripped>
                  <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>#</Table.HeaderCell>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Time</Table.HeaderCell>
                          <Table.HeaderCell>Kind</Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
                  <Table.Body>
                      {this.displayAppointments(appointments)}
                  </Table.Body>
              </Table>
          )
      }
    };
    render(){
        const {appointments=[], doctorInfo={}} = this.props;
         let {lastName=""} = doctorInfo;
        return(
            <div>
                <h1> {`Dr. ${lastName}`}</h1>
                {this.displayPatientsInfo(appointments)}
            </div>
        )
    }
}
DoctorPatients.propTypes = {
    appointments: PropTypes.array.isRequired,
    doctorInfo: PropTypes.object.isRequired,

};

export default DoctorPatients;
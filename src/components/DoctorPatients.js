import React, {Component} from 'react'

class DoctorPatients extends Component {
    constructor(props){
        super(props);
    }


    render(){

        return(
            <div>
                {/*<h1> {this.props.doctorInfo}</h1>*/}
                {/*<h4> {this.props.appointments}</h4>*/}
                Doctor Info
            </div>

        )
    }
}

export default DoctorPatients;
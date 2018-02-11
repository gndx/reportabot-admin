import React, { Component } from 'react';
import firebaseConf from './Firebase';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reports: []
    };
  }

  async componentWillMount() {
    let formRef = firebaseConf.database().ref('data').orderByKey().limitToLast(6);
    await formRef.on('child_added', snapshot => {
      const { lat, long, numReport, type, userId } = snapshot.val();
      const data = { lat, long, numReport, type, userId};
      this.setState({ reports: [data].concat(this.state.reports) });
    })
  }

  timeStamp = (numReport) => {
    const time = moment.unix(numReport).format("YYYY-MM-DD HH:mm");
    return time;
  }

  getUser = (userId) => {
    const TOKEN = '<YOUR_TOKEN>'
    const USER_URL = `https://graph.facebook.com/v2.6/${userId}?fields=first_name,last_name,profile_pic&access_token=${TOKEN}`
    return USER_URL
  }

  getMap = (lat, long) => {
    const MAP_URL = `https://maps.google.com/?q=@${lat},${long}`
    return MAP_URL
  }


  render() {
    const { reports } = this.state
    console.log(reports)
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2>ReportaBot Admin Panel</h2>
            </div>
          </div>

        <div className="row">
          <div className="col-sm-3">
              <p>fecha:</p>
          </div>
          <div className="col-sm-2">
            <p>Ususario: </p>
          </div>
          <div className='col-sm-2'>
            <p>Incidencia:</p>
          </div>
          <div className="col-sm-2">
            <p>Ubicacion:</p>
          </div>
          <div className='col-sm-1'>
            <p>Estatus:</p>
          </div>
          <div className="col-sm-2">
            <p>Estado: </p>
          </div>
        </div>

        {reports.map((report) => 
          <div className="row" key={report.numReport}>
            <div className="col-sm-3">
              <p>{this.timeStamp(report.numReport)}</p>
            </div>
            <div className="col-sm-2">
              <p> <a href={this.getUser(report.userId)} target='_blank'>{report.userId}</a></p>
            </div>
            <div className='col-sm-2'>
              <p>{report.type}</p>
            </div>
            <div className="col-sm-2">
              <p><a href={this.getMap(report.lat, report.long)} target='_blank' >Ver en el Mapa</a></p>
            </div>
            <div className='col-sm-1'>
              <p>Activo</p>
            </div>
            <div className="col-sm-2">
              <button className='btn btn-sm btn-success'>Resuelto</button>
            </div>
          </div>)}


        </div>
      </div>
    );
  }
}

export default App;

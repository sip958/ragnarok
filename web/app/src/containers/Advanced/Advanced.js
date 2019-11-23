import React, { Component } from 'react';
import './Advanced.scss';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Socket from './../../components/Socket/Socket';

class Advanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(),

      MashTunHeater: false,
      MashTunValveInlet: false,
      MashTunValveOutlet: false,
      
      MashTunTemperatureSetPoint: 65,
      MashTunTemperatureProbe: 23.2,
      MashTunWaterSetPoint: 14.5,
      MashTunWaterProbe: 12.8,
      MashTunTimeSetPoint: 9.5,
      MashTunTimeProbe: 5.2,
      
      BoilKettleHeater: false,
      BoilKettleValveWater: false,
      BoilKettleValveInlet: false,
      BoilKettleValveOutlet: false,

      BoilKettleTemperatureSetPoint: 100,
      BoilKettleTemperatureProbe: 40.8,
      BoilKettleWaterSetPoint: 7.5,
      BoilKettleWaterProbe: 3.4,
      BoilKettleTimeSetPoint: 60.0,
      BoilKettleTimeProbe: 20.5,

      ChillerValveWater: false,
      ChillerValveWort: false,
      OutletValveDump: false,
      Pump: false,

    };
  }
  
  componentDidMount() {
    const { socket } = this.state.socket;
    socket.onmessage = (result) => {
      const data = JSON.parse(result.data)
      // if (data.MashTunTemperatureProbe) {
      //   this.setState({MashTunTemperatureProbe: data.MashTunTemperatureProbe});
      // }
      // if (data.BoilKettleTemperatureProbe) {
      //   this.setState({BoilKettleTemperatureProbe: data.BoilKettleTemperatureProbe});
      // }
      console.log('[WS]: message!:', data, data[0]);
    };
  }

  componentWillUnmount() {
    const { socket } = this.state.socket;
    socket.close();
  }

  handleSwitchChange = name => event => {
    const { state } = this.state;
    this.setState({ ...state, [name]: event.target.checked });
    console.log('[ADV]: Switch:', name, (event.target.checked) ? 'ON' : 'OFF');
  };

  handleSliderSetPoint = name => (event, value) => {
    const { state } = this.state;
    this.setState({ ...state, [name]: value[1] });
    console.log('[ADV]: CurrentPoint:', name, value[0]);
    console.log('[ADV]: SetPoint:', name, value[1]);
  }

  render() {
    const marksTemperature = [
      { value: 0, label: '0°C' },
      { value: 25, label: '25°C' },
      { value: 50, label: '50°C' },
      { value: 75, label: '75°C' },
      { value: 100, label: '100°C' },
    ];

    const marksWater = [
      { value: 0, label: '0L' },
      { value: 4, label: '4L' },
      { value: 8, label: '8L' },
      { value: 12, label: '12L' },
      { value: 16, label: '16L' },
    ];

    const marksTime = [
      { value: 0, label: '0\'' },
      { value: 30, label: '30\'' },
      { value: 60, label: '60\'' },
      { value: 90, label: '90\'' },
      { value: 120, label: '120\'' },
    ];

    return(
      <Grow in={true}>
        <div className="Advanced">
        <div className="label" style={{padding: '0.5rem'}}>Advanced Mode</div>
          <Grid container>

            <Grid item xs={6}>
              <Paper elevation={2}>
                <h4>Mash Tun</h4>
                <Slider
                  className="temperature"
                  defaultValue={[this.state.MashTunTemperatureProbe, this.state.MashTunTemperatureSetPoint]}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  max={marksTemperature[4].value}
                  marks={marksTemperature}
                  valueLabelDisplay="on"
                  onChangeCommitted={this.handleSliderSetPoint("MashTunTemperatureSetPoint")}
                />
                <div className="label">Temperature</div>

                <Slider
                  className="water"
                  defaultValue={[this.state.MashTunWaterProbe, this.state.MashTunWaterSetPoint]}
                  aria-labelledby="discrete-slider-always"
                  step={0.1}
                  max={marksWater[4].value}
                  marks={marksWater}
                  valueLabelDisplay="on"
                  onChangeCommitted={this.handleSliderSetPoint("MashTunWaterSetPoint")}
                />
                <div className="label">Water level</div>

                <Slider
                  className="time"
                  defaultValue={[this.state.MashTunTimeProbe, this.state.MashTunTimeSetPoint]}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  max={marksTime[4].value}
                  marks={marksTime}
                  valueLabelDisplay="on"
                  onChangeCommitted={this.handleSliderSetPoint("MashTunTimeSetPoint")}
                />
                <div className="label">Process time</div>
                
                <p> </p>
                <h4>Mash Tun Valves</h4>
                <FormControlLabel
                  control={<Switch checked={this.state.MashTunHeater} onChange={this.handleSwitchChange('MashTunHeater')}  value="MashTunHeater" className="heater" />}
                  label="Heater"
                />
                <FormControlLabel
                  control={<Switch checked={this.state.MashTunValveInlet} onChange={this.handleSwitchChange('MashTunValveInlet')}  value="MashTunValveInlet" />}
                  label="Inlet"
                />
                <FormControlLabel
                  control={<Switch checked={this.state.MashTunValveOutlet} onChange={this.handleSwitchChange('MashTunValveOutlet')}  value="MashTunValveOutlet" />}
                  label="Outlet"
                />
              </Paper>
            </Grid>
            
            
            

            <Grid item xs={6}>
              <Paper elevation={2}>
                <h4>Boil Kettle</h4>
                <Slider
                  className="temperature"
                  defaultValue={[this.state.BoilKettleTemperatureProbe, this.state.BoilKettleTemperatureSetPoint]}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  max={marksTemperature[4].value}
                  marks={marksTemperature}
                  valueLabelDisplay="on"
                  onChangeCommitted={this.handleSliderSetPoint("BoilKettleTemperatureSetPoint")}
                />
                <div className="label">Temperature</div>

                <Slider
                  className="water"
                  defaultValue={[this.state.BoilKettleWaterProbe, this.state.BoilKettleWaterSetPoint]}
                  aria-labelledby="discrete-slider-always"
                  step={0.1}
                  max={marksWater[4].value}
                  marks={marksWater}
                  valueLabelDisplay="on"
                  onChangeCommitted={this.handleSliderSetPoint("BoilKettleWaterSetPoint")}
                />
                <div className="label">Water level</div>

                <Slider
                  className="time"
                  defaultValue={[this.state.BoilKettleTimeProbe, this.state.BoilKettleTimeSetPoint]}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  max={marksTime[4].value}
                  marks={marksTime}
                  valueLabelDisplay="on"
                  onChangeCommitted={this.handleSliderSetPoint("BoilKettleTimeSetPoint")}
                />
                <div className="label">Process time</div>

                <p> </p>
                <h4>Boil Kettle Valves</h4>
                <FormControlLabel
                  control={<Switch checked={this.state.BoilKettleHeater} onChange={this.handleSwitchChange('BoilKettleHeater')}  value="BoilKettleHeater" className="heater" />}
                  label="Heater"
                />
                <FormControlLabel
                  control={<Switch checked={this.state.BoilKettleValveWater} onChange={this.handleSwitchChange('BoilKettleValveWater')}  value="BoilKettleValveWater" />}
                  label="Water"
                />
                <FormControlLabel
                  control={<Switch checked={this.state.BoilKettleValveInlet} onChange={this.handleSwitchChange('BoilKettleValveInlet')}  value="BoilKettleValveInlet" />}
                  label="Inlet"
                />
                <FormControlLabel
                  control={<Switch checked={this.state.BoilKettleValveOutlet} onChange={this.handleSwitchChange('BoilKettleValveOutlet')}  value="BoilKettleValveOutlet" />}
                  label="Outlet"
                />
              </Paper>
            </Grid>









            <Grid item xs={6}>
              <Paper elevation={2}>
                <h4>Chiller valves</h4>
                <FormControlLabel
                  control={<Switch checked={this.state.ChillerValveWater} onChange={this.handleSwitchChange('ChillerValveWater')}  value="ChillerValveWater" />}
                  label="Water"
                />
                <FormControlLabel
                  control={<Switch checked={this.state.ChillerValveWort} onChange={this.handleSwitchChange('ChillerValveWort')}  value="ChillerValveWort" />}
                  label="Wort"
                />
              </Paper>
            </Grid>
            
            <Grid item xs={6}>
              <Paper elevation={2}>
                <h4>Outlet valve</h4>
                <FormControlLabel
                  control={<Switch checked={this.state.OutletValveDump} onChange={this.handleSwitchChange('OutletValveDump')}  value="OutletValveDump" />}
                  label="Dump"
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={2}>
                <h4>Pump</h4>
                <FormControlLabel
                  control={<Switch checked={this.state.Pump} onChange={this.handleSwitchChange('Pump')}  value="Pump" className="heater" />}
                  label="Motor"
                /> 
              </Paper>
            </Grid>


          </Grid>
        </div>
      </Grow>
    );
  }
}

export default Advanced;
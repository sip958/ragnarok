import React, { Component } from 'react';
import './Home.scss';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Fab from '@material-ui/core/Fab';
import AdvancedIcon from '@material-ui/icons/TouchAppRounded';
import Gauge from '../../components/Gauge';
import Socket from './../../components/Socket/Socket';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(),

      MashTunFocus: true,
      MashTunTemperatureSetPoint: 65,
      MashTunTemperatureProbe: 23.2,
      MashTunWaterSetPoint: 14.5,
      MashTunWaterProbe: 12.8,
      MashTunTimeSetPoint: 9.5,
      MashTunTimeProbe: 5.2,
      
      BoilKettleFocus: false,
      BoilKettleTemperatureSetPoint: 100,
      BoilKettleTemperatureProbe: 99.8,
      BoilKettleWaterSetPoint: 7.5,
      BoilKettleWaterProbe: 3.4,
      BoilKettleTimeSetPoint: 60.0,
      BoilKettleTimeProbe: 20.5,
    };
    this.handleAdvancedClick = this.handleAdvancedClick.bind(this);
  }

  componentDidMount() {
    const { socket } = this.state.socket;
    socket.onmessage = (result) => {
      const data = JSON.parse(result.data)
      if (data.MashTunTemperatureProbe) {
        // TESTING GAUGE ORDER CHANGE
        // if(data.MashTunTemperatureProbe > 50){
        //   this.setState({MashTunFocus: true, BoilKettleFocus: false});
        // }else{
        //   this.setState({MashTunFocus: false, BoilKettleFocus: true});
        // }
        this.setState({MashTunTemperatureProbe: data.MashTunTemperatureProbe});
      }

      if (data.MashTunTemperatureSetPoint) {
        this.setState({MashTunTemperatureSetPoint: data.MashTunTemperatureSetPoint});
      }
      if (data.MashTunWaterProbe) {
        this.setState({MashTunWaterProbe: data.MashTunWaterProbe});
      }
      if (data.MashTunWaterSetPoint) {
        this.setState({MashTunWaterSetPoint: data.MashTunWaterSetPoint});
      }
      if (data.MashTunTimeProbe) {
        this.setState({MashTunTimeProbe: data.MashTunTimeProbe});
      }
      if (data.MashTunTimeSetPoint) {
        this.setState({MashTunTimeSetPoint: data.MashTunTimeSetPoint});
      }

      if (data.BoilKettleTemperatureProbe) {
        this.setState({BoilKettleTemperatureProbe: data.BoilKettleTemperatureProbe});
      }
      if (data.BoilKettleTemperatureSetPoint) {
        this.setState({BoilKettleTemperatureSetPoint: data.BoilKettleTemperatureSetPoint});
      }
      if (data.BoilKettleWaterProbe) {
        this.setState({BoilKettleWaterProbe: data.BoilKettleWaterProbe});
      }
      if (data.BoilKettleWaterSetPoint) {
        this.setState({BoilKettleWaterSetPoint: data.BoilKettleWaterSetPoint});
      }
      if (data.BoilKettleTimeProbe) {
        this.setState({BoilKettleTimeProbe: data.BoilKettleTimeProbe});
      }
      if (data.BoilKettleTimeSetPoint) {
        this.setState({BoilKettleTimeSetPoint: data.BoilKettleTimeSetPoint});
      }
      console.log('[WS]: message!:', data);
    };
  }

  componentWillUnmount() {
    const { socket } = this.state.socket;
    socket.close();
  }

  handleAdvancedClick() {
    this.props.history.push('/advanced')
  }

  render() {
    const { 
      MashTunTemperatureSetPoint,
      MashTunTemperatureProbe,
      MashTunWaterSetPoint,
      MashTunWaterProbe,
      MashTunTimeSetPoint,
      MashTunTimeProbe,
      MashTunFocus,
      BoilKettleTemperatureSetPoint,
      BoilKettleTemperatureProbe,
      BoilKettleWaterSetPoint,
      BoilKettleWaterProbe,
      BoilKettleTimeSetPoint,
      BoilKettleTimeProbe,
      BoilKettleFocus,
    } = this.state;

    return(
      <Grow in={true}>
        <div className="Home">
          <Grid container>
            <Grid item xs>
              <Gauge
                id='MashTunGauge'
                title='Mash Tun'
                setPointTemperature={MashTunTemperatureSetPoint}
                valueTemperature={MashTunTemperatureProbe}
                setPointWater={MashTunWaterSetPoint}
                valueWater={MashTunWaterProbe}
                setPointTime={MashTunTimeSetPoint}
                valueTime={MashTunTimeProbe}
                focus={MashTunFocus}
              />
            </Grid>
            <Grid item xs>
              <div className="button-advanced">
                <Fab variant="extended" onClick={this.handleAdvancedClick} size="large" aria-label="advanced">
                  <AdvancedIcon />
                  Advanced
                </Fab>
              </div>
            </Grid>
            <Grid item xs>
              <Gauge
                id='BoilKettleGauge'
                title='Boil Kettle'
                setPointTemperature={BoilKettleTemperatureSetPoint}
                valueTemperature={BoilKettleTemperatureProbe}
                setPointWater={BoilKettleWaterSetPoint}
                valueWater={BoilKettleWaterProbe}
                setPointTime={BoilKettleTimeSetPoint}
                valueTime={BoilKettleTimeProbe}
                focus={BoilKettleFocus}
              />
            </Grid>
          </Grid>
        </div>
      </Grow>
    );
  }
}

export default Home;
import React, { Component } from 'react';
import './Home.scss';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Fab from '@material-ui/core/Fab';
import AdvancedIcon from '@material-ui/icons/TouchAppRounded';
import Gauge from '../../components/Gauge';
import Socket from './../../components/Socket/Socket';
import { withSnackbar } from 'notistack';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(),

      MashTunFocus: true,
      MashTunTemperatureSetPoint: 0,
      MashTunTemperatureProbe: 0,
      MashTunWaterLevelSetPoint: 0,
      MashTunWaterLevelProbe: 0,
      MashTunTimeSetPoint: 0,
      MashTunTimeProbe: 0,
      
      BoilKettleFocus: false,
      BoilKettleTemperatureSetPoint: 0,
      BoilKettleTemperatureProbe: 0,
      BoilKettleWaterLevelSetPoint: 0,
      BoilKettleWaterLevelProbe: 0,
      BoilKettleTimeSetPoint: 0,
      BoilKettleTimeProbe: 0,
    };
    this.handleAdvancedClick = this.handleAdvancedClick.bind(this);
  }

  componentDidMount() {
    const { socket } = this.state.socket;
    socket.onmessage = (result) => {
      const data = JSON.parse(result.data)
      if (data.MashTunTemperatureProbe) {
        // TESTING GAUGE ORDER CHANGE
        if(data.BoilKettleTemperatureProbe > 100){
          this.setState({MashTunFocus: false, BoilKettleFocus: true});
        }else{
          this.setState({MashTunFocus: true, BoilKettleFocus: false});
        }
        this.setState({MashTunTemperatureProbe: data.MashTunTemperatureProbe.toFixed(1)});
      }

      if (data.MashTunTemperatureSetPoint) {
        this.setState({MashTunTemperatureSetPoint: data.MashTunTemperatureSetPoint.toFixed(1)});
      }
      if (data.MashTunWaterLevelProbe) {
        this.setState({MashTunWaterLevelProbe: data.MashTunWaterLevelProbe.toFixed(1)});
      }
      if (data.MashTunWaterLevelSetPoint) {
        this.setState({MashTunWaterLevelSetPoint: data.MashTunWaterLevelSetPoint.toFixed(1)});
      }
      if (data.MashTunTimeProbe) {
        this.setState({MashTunTimeProbe: data.MashTunTimeProbe});
      }
      if (data.MashTunTimeSetPoint) {
        this.setState({MashTunTimeSetPoint: data.MashTunTimeSetPoint});
      }

      if (data.BoilKettleTemperatureProbe) {
        this.setState({BoilKettleTemperatureProbe: data.BoilKettleTemperatureProbe.toFixed(1)});
      }
      if (data.BoilKettleTemperatureSetPoint) {
        this.setState({BoilKettleTemperatureSetPoint: data.BoilKettleTemperatureSetPoint.toFixed(1)});
      }
      if (data.BoilKettleWaterLevelProbe) {
        this.setState({BoilKettleWaterLevelProbe: data.BoilKettleWaterLevelProbe.toFixed(1)});
      }
      if (data.BoilKettleWaterLevelSetPoint) {
        this.setState({BoilKettleWaterLevelSetPoint: data.BoilKettleWaterLevelSetPoint.toFixed(1)});
      }
      if (data.BoilKettleTimeProbe) {
        this.setState({BoilKettleTimeProbe: data.BoilKettleTimeProbe});
      }
      if (data.BoilKettleTimeSetPoint) {
        this.setState({BoilKettleTimeSetPoint: data.BoilKettleTimeSetPoint});
      }

      if (data.notice) {
        for(const message in data.notice){
          this.props.enqueueSnackbar(data.notice[message], { 
            variant: 'info',
            persist: true,
          });
        }
      }
      if (data.error) {
        for(const message in data.error){
          this.props.enqueueSnackbar(data.error[message], { 
            variant: 'error',
          });
        }
      }
      // console.log('[WS]: message!:', data);
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
      MashTunWaterLevelSetPoint,
      MashTunWaterLevelProbe,
      MashTunTimeSetPoint,
      MashTunTimeProbe,
      MashTunFocus,
      BoilKettleTemperatureSetPoint,
      BoilKettleTemperatureProbe,
      BoilKettleWaterLevelSetPoint,
      BoilKettleWaterLevelProbe,
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
                setPointWater={MashTunWaterLevelSetPoint}
                valueWater={MashTunWaterLevelProbe}
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
                setPointWater={BoilKettleWaterLevelSetPoint}
                valueWater={BoilKettleWaterLevelProbe}
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

export default withSnackbar(Home);
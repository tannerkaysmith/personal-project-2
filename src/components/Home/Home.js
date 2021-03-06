import React, { Component } from 'react';
import './Home.css';
import Nav from './../Nav/Nav.js';
import Header from './../Header/Header.js';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={1025} />;
const Tablet = props => <Responsive {...props} minWidth={1} maxWidth={1024} />;


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resp: [""],
            firstLoad: true
        }
        this.deleteTeam = this.deleteTeam.bind(this);
    }

    componentDidMount() {
        axios.get('/api/teams').then( resp => {
            console.log(resp)
            this.setState({
                resp: resp.data,
                firstLoad: false

            })
        })
    }

    deleteTeam(id){
        var r = window.confirm('Are you sure you want to delete this team?');
        if (r === true) {
            axios.delete('/api/teams/' + id).then(resp =>{
                console.log(resp.data)
                this.setState({
                    resp : resp.data
                })
            })
        }
        
    }

    render() {
        var teamsToDisplay = this.state.resp.map( (val, i) => {
            return (
                <div key={i} className='team-container'>
                    <div className='team-container-name'>{val.team_name}</div>
                    <div className='team-container-sport'>{val.sport}</div>
                    <div className='team-container-time-zone'>{val.time_zone}</div>
                    <div className='team-container-country'>{val.country}</div>
                    <div className='team-container-zip-code'>{val.zip_code}</div>
                    <div className='team-container-logo'>{val.logo}</div>
                    <Link to={'/homeroster/'+val.teams_id}><button className='team-container-button-edit'>Roster</button></Link >
                    <Link to={'/homeschedule/'+val.teams_id}><button className='team-container-button-edit'>Schedule</button></Link >
                    <Link to={'/editteam/'+val.teams_id}><button className='team-container-button-edit'>Edit</button></Link >
                    <button className='team-container-button-delete' onClick={ () => this.deleteTeam(val.teams_id)}>Delete</button>
                </div>
            )
        })


        var teamsToDisplayTablet = this.state.resp.map( (val, i) => {
            return (
                <div key={i} className='team-container-tablet'>
                    <div className='team-container-info-tablet'>
                    <div className='team-container-name-tablet'>{val.team_name}</div>
                    <div className='team-container-sport-tablet'>{val.sport}</div>
                    <div className='team-container-time-zone-tablet'>{val.time_zone}</div>
                    <div className='team-container-country-tablet'>{val.country}</div>
                    <div className='team-container-zip-code-tablet'>{val.zip_code}</div>
                    </div>
                    <hr className='hr-tablet-aaa'/>
                    <div className='team-container-buttons-tablet'>
                    <Link to={'/homeroster/'+val.teams_id}><button className='team-container-button-edit-tablet'>Roster</button></Link >
                    <Link to={'/homeschedule/'+val.teams_id}><button className='team-container-button-edit-tablet'>Schedule</button></Link >
                    <Link to={'/editteam/'+val.teams_id}><button className='team-container-button-edit-tablet'>Edit</button></Link >
                    <button className='team-container-button-delete-tablet' onClick={ () => this.deleteTeam(val.teams_id)}>Delete</button>
                </div>
                </div>
            )
        })

        return (
            <div>
                <Desktop>
            <center><div className="Home">

                <div className='home-navvv'>
                    <Nav />
                </div>

                <div className='home-header'>
                    <Header />
                </div>

                

                { this.state.resp.length ? 
                    <div>
                    <div className='team-container-title'><h1 className='teams-title-h1'>Teams</h1></div>

                <div className='team-container' >
                <a href='/#/createteam'><button className='team-container-button-new'>+ New</button></a>
                    <button className='team-container-button-new-1'></button>
                    <button className='team-container-button-new-1'></button>
                    <button className='team-container-button-new'>Import</button>
                    <button className='team-container-button-new'>Export</button>
                    <button className='team-container-button-new'>Event Settings</button>
                    
                </div>

                <div className='team-container-title'>
                    <div className='team-container-name-title'>Team Name</div>
                    <div className='team-container-name-title'>Sport</div>
                    <div className='team-container-name-title'>Time Zone</div>
                    <div className='team-container-name-title'>Country</div>
                    <div className='team-container-name-title'>Zip Code</div>
                    <div className='team-container-name-title'></div>
                    <div className='team-container-button-edit-title'> </div>
                    <div className='team-container-button-delete-title'> </div>
                </div>
                    
                    {teamsToDisplay} </div> : <div className='center-circle'>
                    <div className='no-team-text'>Looks like you haven't created a team yet :(</div>
                    <div className='player-icon'><img src='/player.svg' alt='player-icon'/></div>
                    <div ><a href='/#/createteam'><button  className='add-team-button'>+ Add a team</button></a></div>
                </div>}

            </div></center>
            </Desktop>




            <Tablet>
            <center><div className="Home-tablet">

                

                <div className='home-header-tablet'>
                    <Header />
                </div>

                

                { this.state.resp.length ? 
                    <div>
                    <div><h1 className='teams-title-h1-tablet'>Teams</h1></div>

                <div className='team-container-tablet-aaa' >
                <a href='/#/createteam'><button className='team-container-button-new-tablet'>+ New</button></a>
                    <button className='team-container-button-new-tablet'>Import</button>
                    <button className='team-container-button-new-tablet'>Export</button>
                    <button className='team-container-button-new-tablet'>Settings</button>
                    
                </div>

                <div className='team-container-title-tablet'>
                    <div className='team-container-name-title-tablet'>Team Name</div>
                    <div className='team-container-name-title-tablet'>Sport</div>
                    <div className='team-container-name-title-tablet'>Time Zone</div>
                    <div className='team-container-name-title-tablet'>Country</div>
                    <div className='team-container-name-title-tablet'>Zip Code</div>
                </div>
                    
                    {teamsToDisplayTablet} </div> : <div className='center-circle-tablet'>
                    <div className='no-team-text-tablet'>Looks like you haven't created a team yet :(</div>
                    <div className='player-icon-tablet'><img className='player-svg-icon-tablet' src='/player.svg' alt='player-icon'/></div>
                    <div ><a href='/#/createteam'><button  className='add-team-button-tablet'>+ Add a team</button></a></div>
                </div>}

                <div className='home-navvv-tablet'>
                    <Nav />
                </div>

            </div></center>
            </Tablet>
            </div>
        )
    }


}

export default Home;
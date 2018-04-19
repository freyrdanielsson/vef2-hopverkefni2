import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { fetch } from '../../actions/users';
import Button from '../button';
import UserPage from '../userPage';
import NotFound from '../../routes/not-found';

import './UsersList.css';

// Sér til þess að síða refreshi þegar smellt er a back
window.onpopstate = function(event) {
    window.location.reload();
  };

class UsersList extends Component {
    state = { page: 1, id: 0}

    // skilar -1 ef page er invalid annars page
    getPage(page) {
        return (isNaN(page) || page <= 0) ? -1 : parseInt(page);
    }


    getUrlParams(){
        const urlParams = this.state;

        let match,
            pl     = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

            while (match = search.exec(query)){
                urlParams[decode(match[1])] = decode(match[2]);
            }

        // Validate-a page
        urlParams.page = this.getPage(urlParams.page);
        // Skila öllum url search params
        return urlParams;
    }

    componentDidMount() {
        const params = this.getUrlParams();
        const { dispatch } = this.props;
        
        // passa að sækja eftir réttu urli í refresh
        const validUrl = params.page > 0
            ? params.id > 0 
                ? `/${params.id}/read?offset=${(params.page-1)*10}`
                : `?offset=${(params.page-1)*10}`
            : params.id > 0
                ? `/${params.id}/read`
                : '';
        
        dispatch(fetch('/users', validUrl, this.props.className));
        
        if(params.id) {
            dispatch(fetch('/users', `/${params.id}`))
        }
        
        this.setState({page: params.page, id: params.id});
    }
    
    changeId = async (id) => {
        const { dispatch } = this.props;
        const validUrl = `/${id}/read`;

        dispatch(fetch('/users', validUrl, this.props.className));
        dispatch(fetch('/users', `/${id}`))

        this.setState({id: id});
    }

    handleBookChange = async (pageNr) => {
        window.history.pushState(null, '', `/users?id=${this.state.id}&page=${pageNr}`);
        const { dispatch } = this.props;
        const validUrl = `?offset=${(pageNr-1)*10}`;
        dispatch(fetch(`/users/${this.state.id}/read`, validUrl, this.props.className));

        this.setState({page: pageNr});
    }

    handleUsersChange = async (pageNr) => {
        window.history.pushState(null, '', `/users?page=${pageNr}`);
        const { dispatch } = this.props;
        const validUrl = `?offset=${(pageNr-1)*10}`;
        dispatch(fetch(`/users`, validUrl, this.props.className))

        this.setState({page: pageNr});
    }

    render() {
        const { items, isFetching, className, user } = this.props;
        
        const page = this.state.page;
        
        const userCount = items ? items.length : 0;


         if (isFetching === className) {
			return (
			<div>
				<p><em>Sæki notendur...</em></p>
			</div>
			);
        }
        
        if(this.state.id > 0) {
            return (
                <div>
                    <UserPage user={user} items={items} page={this.state.page} onClick={this.handleBookChange}/>
                </div>
            );
        }

        return (
            <div className="users">
                <ul className="users users--list">
                    {items && (
                        items.map((user) => {
                    const profile = user.image ? user.image : '/profile.jpg';
                    return (
                    <li key={user.id}>
                        <div className="users user--item">
                            <Link to={`?id=${user.id}`} onClick={() => this.changeId(user.id) }>{user.username}</Link>
                            <img className="user profile img" src={profile} alt={user.username}/>
                        </div>
                        <div className="list_seperator"></div>
                    </li>
                    )
                    }))}
                </ul>
                {userCount > 0 && (
                <div>
                    {page > 1 && <Button onClick={() => this.handleUsersChange(page - 1)}>Fyrri Síða</Button>}
                    <p>{`Síða ${page}`}</p>
                    {userCount >= 10 && <Button onClick={() => this.handleUsersChange(page + 1)}>Næsta Síða</Button>}
                </div>
                )}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isFetching: state.users.isFetching,
        items: state.users.items,
        user: state.users.user,
    }
  }
  
  export default connect(mapStateToProps)(UsersList);

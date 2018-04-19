import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { fetch } from '../../actions/me';
import Button from '../button';
import NotFound from '../../routes/not-found';
// import NotFound from '../../routes/not-found';

import './UserPage.css';

// Sér til þess að síða refreshi þegar smellt er a back
window.onpopstate = function(event) {
    window.location.reload();
  };

class UserPage extends Component {
    state = { page: 0, id: 0}

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

        const validUrl = params.page <= 0
            ? params.id <= 0 
                ? `?offset=${(params.page-1)*10}`
                : `/${params.id}/read?offset=${(params.page-1)*10}`
            : params.id <= 0
                ? ''
                : `/${params.id}/read`;
        
        if(params.id) {
            dispatch(fetch('/users', `/${params.id}`))
        }
        dispatch(fetch('/users', validUrl, this.props.className));
        this.setState({page: params.page, id: params.id});
    }
    
    changeId = async (id) => {
        const { dispatch } = this.props;
        const validUrl = `/${id}/read`;
        
        dispatch(fetch('/users', `/${id}`))
        dispatch(fetch('/users', validUrl, this.props.className));

        this.setState({id: id});
    }

    render() {
        const { items, isFetching, className, user } = this.props;
        console.log(this.state);
        
        
        const page = this.state.page;
        const bookCount = items ? items.length : 0;


       /*  if (isFetching === className) {
			return (
			<div>
				<p><em>Hleð bækur...</em></p>
			</div>
			);
        }
        
        if(page <= 0 || bookCount <= 0){
            return (
                <div>
                    <p>Oops, ekki fleiri bækur</p>
                    <Button onClick={() => this.handleChange(1)}>Fyrsta síða</Button>
                </div>
            )
        } */
        
        if(this.state.id > 0) {
            return (
                <div>
                    <p>
                        {user.username}
                    </p>
                    <p>
                        {user.image}
                    </p> 
                </div>
            );
        }

        return (
            <div>
                <ul>
                    {items && (
                        items.map((user) => {
                    return (
                    <li key={user.id}>
                        <Link to={`?id=${user.id}`} onClick={() => this.changeId(user.id) }>{user.username}</Link>
                    </li>
                    )
                    }))}
                </ul>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isFetching: state.me.isFetching,
        items: state.me.items,
        user: state.me.user,
    }
  }
  
  export default connect(mapStateToProps)(UserPage);

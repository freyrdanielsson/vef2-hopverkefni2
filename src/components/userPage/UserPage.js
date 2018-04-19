import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Button from '../button';
import NotFound from '../../routes/not-found';

import './UserPage.css';

// Sér til þess að síða refreshi þegar smellt er a back
window.onpopstate = function(event) {
    window.location.reload();
  };

class UserPage extends Component {
    render() {
        const { user, items, page, onClick } = this.props;
        const profile = user.image ? user.image : '/profile.jpg';
        const bookCount = items ? items.length : 0;

        return (
            <section>
                <div className="user">
                    <div className="user profile">
                        <img className="user profile img" src={profile} alt={user.usename}/>
                    </div>
                    <div className="user info">
                        <p>{user.username}</p>
                    </div>
                </div>
                <ul>
                    {items && (
                        items.map((book) => {
                    return (
                    <li key={book.id}>
                            <Link to={`/books/${book.book_id}`}>{book.title}</Link>
                            <div>
                                <p>{book.rating && (`Einkun: ${book.rating}`)}</p>
                            </div>
                            <div>
                                <p>{book.review && (`Um bók: ${book.review}`)}</p>
                            </div>
                    </li>
                    )
                    }))}
                </ul>
                {bookCount > 0 && (
                <div>
                    {page > 1 && <Button onClick={() => onClick(page - 1)}>Fyrri Síða</Button>}
                    <p>{`Síða ${page}`}</p>
                    {bookCount >= 10 && <Button onClick={() => onClick(page + 1)}>Næsta Síða</Button>}
                </div>
                )}
                {(page <= 0 || bookCount <= 0) && 
                    <div>
                        <p>Oops, ekki fleiri bækur</p>
                        <Button onClick={() => onClick(1)}>Fyrsta síða</Button>
                    </div>
                }
            </section>

        );
    }

}

  
export default UserPage;

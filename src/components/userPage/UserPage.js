import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';

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
                <div className="user user--page">
                    <div className="user profile">
                        <img className="user profile img" src={profile} alt={user.usename}/>
                    </div>
                    <div className="user user--info">
                        <h2>{user.username}</h2>
                    </div>
                </div>
                <ul className="user__list">
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
                <div className="buttonLayout">
                    {page > 1 && <Button className="pageButton" onClick={() => onClick(page - 1)}>Fyrri Síða</Button>}
                    <div className="pageHolder">
                        <p className="page">{`Síða ${page}`}</p>
                    </div>
                    {bookCount >= 10 && <Button onClick={() => onClick(page + 1)}>Næsta Síða</Button>}
                </div>
                )}
                {(page === 1 && bookCount <= 0) && 
                    <div>
                        <p>Engar lesnar bækur</p>
                    </div>
                }
                {( page > 1 && bookCount <= 0 ) && 
                    <div>
                        <p>Ekki fleiri bækur</p>
                        <Button onClick={() => onClick(1)}>Fyrsta síða</Button>
                    </div>
                }
            </section>

        );
    }

}

  
export default UserPage;

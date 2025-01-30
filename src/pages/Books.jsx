import { useContext, useEffect, useState } from "react"
import { baseurl } from "../components/Baseurl";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { async } from './../../node_modules/react-router/dist/development/index.d';


export const Books = () => {
    const [books, setbooks] = useState([]);
    const [loading, setloading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('');
    const [category, setCategory] = useState('');
    const [filterCat, setFilterCat] = useState('');
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, [currentPage, sort, category]);

    const fetchBooks = async () => {
        try {
            let url = `${baseurl}?page=${currentPage}&limit=5`;
            if (sort) {
                url += `&sort=${sort}`;
            }
            if (category) {
                url += `&category=${category}`;
            }

            const reponse = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            const data = await reponse.json();
            setbooks(data);

            const fileredcat = [...new set(data.map(book => book.category))];
            setFilterCat(fileredcat);
        }

        catch (error) {
            console.log("Error in fetching books", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${baseurl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if (response.ok) {
                fetchBooks();
            }
        }
        catch (error) {
            console.log('Error in deleting book', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="books-conatiner">
            <div className="books-head">
                <div className="sortFilterCont">
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value=''>Sort by..</option>
                        <option value='name_asc'>Name (A-Z)</option>
                        <option value='price_asc'>Price (Low to High)</option>
                        <option value='price_desc'>Price (High to Low)</option>
                    </select>

                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>All Categories</option>
                        {filterCat.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <button onClick={() => navigate('/books/new')} className="btn">Add New Book</button>
            </div>
            <div className="bookdata">
                {books.map(b => (
                    <>
                        <div key={b.id}>
                            <div className="img">{b.coverImage}</div>
                            <h3>Name: {b.name}</h3>
                            <h3>Author: {b.author}</h3>
                            <h3>Price: {b.price}</h3>
                            <button onClick={() => navigate(`/books/${b.id}`)}>View Details</button>
                            <button onClick={() => navigate(`/books/${b.id}/edit`)}>Edit</button>
                            <button onClick={() => handleDelete(b.id)}>Delete</button>
                        </div>
                    </>
                ))}
            </div>

            <div className="pagination">
                <button onClick={()=>setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Previous</button>
                <span className="page-info">Page {currentPage}</span>
                <button onClick={()=>setCurrentPage(p => p+1)} disabled={books.length < 5}>Next</button>
            </div>
        </div>
    )


}
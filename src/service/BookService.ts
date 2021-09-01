/* eslint-disable react-hooks/rules-of-hooks */
import { BookService } from './state/BookServiceState';
import { useState, useEffect } from "react"
import {Book} from '../models/Book';

export interface Books{
    data : Book[],
}

const KEY = "favorites";

export const getAllBooks = () => {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [books, setBooks] = useState<BookService<Books>>({
        status: 'loading'
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,image_id')
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                console.log(response.json());
                throw new Error('Something went wrong');
            }
        })
        .then(response => setBooks({
            status: 'loaded',
            payload: response,
        })).catch(error =>{
            console.log(error);
            return setBooks({ 
                status: 'error',
                payload: error.payload,
            })
        })
        ;
    }, []);

    return books;
}

export const getBook = (id: string) => {
    const [art, setArt] = useState<BookService<Book>>({
        status: 'loading',
    });

    useEffect(() => {
        fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id,credit_line,dimensions,date_display,artist_display`)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error('something went wront');
            }
        })
        .then(response => setArt({
            status: 'loaded',
            payload: response.data
        }))
        .catch(error => setArt({
            status: 'error',
            payload: error
        }));
    }, []);

    return art;

}

export const getAllFavorites = ():Book[] => {
    const data = localStorage.getItem(KEY);

    if (data === null){
        return [];
    }
    return JSON.parse(data);
}

export const addFavorite = (book:Book) => {
    const allData = getAllFavorites();
    const data = JSON.stringify([...allData, book]);
    localStorage.setItem(KEY, data);
}

export const isFavorited = (book:Book) => {
    const favorites = getAllFavorites();
    return !!favorites?.some(item => item.id === book.id);
}

export const removeFavorite = (book:Book) => {
    const allData = getAllFavorites();
    const newData = allData?.filter(data => data.id !== book.id);
    localStorage.setItem(KEY, JSON.stringify(newData));
}
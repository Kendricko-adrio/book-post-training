interface BookServiceLoading{
    status: 'loading';
}

interface BookServiceSuccess<T>{
    status: 'loaded';
    payload: T;
}

interface BookServiceError{
    status: 'error';
    payload: string;
}

export type BookService<T> = | BookServiceLoading | BookServiceSuccess<T> | BookServiceError;
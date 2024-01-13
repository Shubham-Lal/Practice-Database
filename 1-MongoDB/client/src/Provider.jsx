import { createContext, useState } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    return (
        <Context.Provider value={{ user, setUser, posts, setPosts }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;
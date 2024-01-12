import { createContext, useState } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;
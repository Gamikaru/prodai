import React, { createContext, useState } from 'react';

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    });

    return (
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};







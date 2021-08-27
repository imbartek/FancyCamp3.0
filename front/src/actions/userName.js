export const USERNAME = 'USERNAME';
export const DELETENAME = 'DELETENAME';

export const userName = (username) => ({
    type: USERNAME,
    payload: username
});

export const deleteName = () => ({
    type: DELETENAME
});
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';

export const signUp = (email,password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrLBVVfFvnOlgV3Mr6tyqdAr9rA5uu5cI',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok){
            const errorResData = await  response.json();
            const errorMsg = errorResData.error.message;
            throw new Error(errorMsg);
        }

        const resData = await response.json();
        //console.log(resData);

        dispatch({
            type: SIGN_UP,
            payload: {
                token: resData.idToken,
                userId: resData.localId
            }
        })
    }
};

export const signIn = (email,password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrLBVVfFvnOlgV3Mr6tyqdAr9rA5uu5cI',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok){
            const resErrorData = await response.json();
            const errorMsg = resErrorData.error.message;
            throw new Error(errorMsg);
        }

        const resData = await response.json();
        //console.log(resData);

        dispatch({
            type: SIGN_IN,
            payload: {
                token: resData.idToken,
                userId: resData.localId
            }
        })
    }
};
const { withIronSession  } = require('next-iron-session'); 




function WithuAuthSession(handler){
    return withIronSession(handler,{
        cookieName: "userSession",
        password: 'KNp726FwR3J3Bf6D3wqVrGWUgdzYFkpa23',//process.env.USER_SESSION,
        ttl:60*60,
        cookieOptions: {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
        }}
    )
};

function WithPublicSession(handler){
    return withIronSession(handler,{
        cookieName: "public",
        password: 'KNp726FwR3J3Bf6D3wqVrGWUgdzYFkpa32',//process.env.PUBLIC_SESSION,
        ttl:60*6,
        cookieOptions: {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
        }}
    )
};


 
module.exports={WithuAuthSession,WithPublicSession}
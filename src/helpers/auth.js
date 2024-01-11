import jwt from "jsonwebtoken";

const createJwt = (payload) => {
	return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
		expiresIn: "1d",
	});
};

const checkJwt = (token) => {
try {
    const decodedToken = jwt.verify(token,`${process.env.JWT_SECRET}`)
    console.log('usuario revisado: ' + decodedToken.uid);
    return decodedToken
} catch (error) {
    return false;
}
}

export {createJwt,checkJwt}
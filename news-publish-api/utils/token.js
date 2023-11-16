const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')
const RevokedToken = require('../models/token/RevokedToken')
const {extract_token_form_authorization} = require('#utils/extract')

const secretKey = 'key202310'
const option_jwt = {
        expiresIn: '1d',
        algorithm: 'HS256'
    }
const createToken = (payload) => {
    if(payload) {
        return jwt.sign(payload, secretKey, option_jwt)
    } else {
        throw new Error('payload is required')
    }
}
const validateToken = (token) => {
    try {
        jwt.verify(token, secretKey)
        return true
    } catch(error) {
        return false
    }
}

const option_verifyJwt = {
        secret: secretKey,
        algorithms: ['HS256'],
        isRevoked: async (req) => {
            const filter = {
                token: extract_token_form_authorization(req.headers.authorization)
            }
            return await RevokedToken.findOne(filter)
            .then((revokedToken) => {
                return revokedToken ? true : false
            })
        }
    },
    option_verifyJwtUnless = {
        path: [
            '/account/login',
            '/account/validate',
        ]
    }
const verifyToken = expressjwt(option_verifyJwt).unless(option_verifyJwtUnless)
const verifyToken_failed = (err, req, res, next) => {
	if(err.name === 'UnauthorizedError') {
		res.status(401).json({
			code: 201,
			msg: '无效的 token ，请重新登录'
		})
	} else {
		next(err)
	}
}

module.exports = {
    createToken,
    validateToken,
    verifyToken,
    verifyToken_failed
}
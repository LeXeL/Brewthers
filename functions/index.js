const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const cors = require('cors')({
    origin: true,
})

const users = require('./lib/users')
const brewery = require('./lib/brewery')
const product = require('./lib/product')
const order = require('./lib/order')

//Handle USERS
exports.createUserOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await users.createDatabaseWithUserInfo(req.body.user)
            res.status(200).send({status: 'Created'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

exports.updateUserWithInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await users.updateDatabaseWithUserInfo(req.body.uid, req.body.obj)
            res.status(200).send({status: 'Updated'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateAdminWithInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await users.updateDatabaseWithAdminInfo(req.body.uid, req.body.obj)
            res.status(200).send({status: 'Updated'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.getUserInformationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.returnUserById(req.body.uid)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returnApprovedUser = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.returnApprovedUser()
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateUserInformation = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.updateUserInfo(
                req.body.uid,
                req.body.user
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateToAproveUser = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.updateToAproveUser(
                req.body.uid,
                req.body.user
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateToRejectUser = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.updateToRejectUser(
                req.body.uid,
                req.body.user
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.addToShoppingCart = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.addToShoppingCart(
                req.body.uid,
                req.body.product
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.removeFromShoppingCart = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.removeFromShoppingCart(
                req.body.uid,
                req.body.product
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.clearShoppingCart = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.clearShoppingCart(req.body.uid)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateShoppingCart = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.updateShoppingCart(
                req.body.uid,
                req.body.product,
                req.body.itemIndex
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

//Handle BREWERY
exports.createBreweryOnDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await brewery.createBrewery(req.body.brewery)
                res.status(200).send({status: 'Created'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.updateBreweryInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await brewery.updateBrewery(
                    req.body.id,
                    req.body.brewery
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.deleteBreweryInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await brewery.deleteBrewery(req.body.id)
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.returnAllBrewerys = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await brewery.returnAllBrewerys()
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

//Handle PRODUCT
exports.createProductOnDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await product.createProduct(req.body.product)
                res.status(200).send({status: 'Created'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.updateProductInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await product.updateProduct(
                    req.body.id,
                    req.body.product
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.deleteProductInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await product.deleteProduct(req.body.id)
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.returnAllProducts = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await product.returnAllProducts()
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

exports.getProductInformationById = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await product.returnProductById(req.body.id)
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)

//Handle ORDERS
exports.createOrdersOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await order.createOrder(req.body.order)
            res.status(200).send({status: 'Created'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateOrdersInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await order.updateOrder(
                    req.body.id,
                    req.body.Order
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.deleteOrdersInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await order.deleteOrder(req.body.id)
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.returnAllOrdersFromUserId = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await order.returnAllOrdersFromUserId(
                    req.body.id
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.returnOrderById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await order.returnOrderById(req.body.id)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.changeOrderStatus = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await order.changeOrderStatus(
                req.body.id,
                req.body.status
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.addToShoppingCartInOrder = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await order.addToShoppingCartInOrder(
                    req.body.uid,
                    req.body.product
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.removeFromShoppingCartInOrder = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await order.removeFromShoppingCartInOrder(
                    req.body.uid,
                    req.body.product
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)

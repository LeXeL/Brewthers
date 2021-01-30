const functions = require('firebase-functions')
const admin = require('firebase-admin')

var serviceAccount = require('./credentials.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
const cors = require('cors')({
    origin: true,
})

const users = require('./lib/users')
const brewery = require('./lib/brewery')
const product = require('./lib/product')
const order = require('./lib/order')
const blog = require('./lib/blog')

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
exports.createAdminUserInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await users.createAdminUserInformation(req.body.obj)
                res.status(200).send({status: 'Updated'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.createBreweryUserInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await users.createBreweryUserInformation(req.body.obj)
                res.status(200).send({status: 'Updated'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
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
exports.getAllProductsByBreweryId = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await product.returnProductByBreweryId(
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
exports.updateShoppingCartInOrder = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await order.updateShoppingCartInOrder(
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
    }
)

//Handle BLOG
exports.createDraftBlogInDataBase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await blog.createDraftBlog(req.body.blogInfo)
                res.status(200).send({status: 'Created'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.createPublicBlogInDataBase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await blog.createPublictBlog(req.body.blogInfo)
                res.status(200).send({status: 'Created'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.getBlogById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await blog.returnBlogById(req.body.id)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateBlog = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            if (req.body.type === 'draft') {
                await blog.updateDraftBlog(req.body.id, req.body.blogInfo)
                res.status(200).send({status: 'Updated'})
            }
            if (req.body.type === 'public') {
                await blog.updatePublicBlog(req.body.id, req.body.blogInfo)
                res.status(200).send({status: 'Updated'})
            }
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

exports.updateDeletedBlog = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await blog.updateDeletedBlog(req.body.id, req.body.blogInfo)
            res.status(200).send({status: 'deleted'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returnPublicBlogs = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await blog.returnPublicBlogs()
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.addToNewsletter = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await blog.addToNewsletter(req.body.userEmail)
            res.status(200).send({status: 'Created'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

exports.populateAuthUsers = functions.https.onRequest(async (req, res) => {
    if (!process.env['FUNCTIONS_EMULATOR']) {
        return res
            .status(403)
            .send(
                'ACCESS DENIED. This function is ONLY available via an emulator'
            )
    }
    const users = [
        //Admins
        {
            uid: 'jMlJOGMfCjbLfzSvvnOEg9MSsI22',
            email: 'alejandromillan29@live.com',
            password: 'Brewthers123!',
        },
        {
            uid: 'sWMNXNNG6ZTOFAhTMRPzSJ6BajE2',
            email: 'diego.r2892@gmail.com',
            password: 'Brewthers123!',
        },
        //Casas Cervezeras
        {
            uid: 'cxSfrUoR5oTCZEmRY3INCjRB1FG2',
            email: 'diego@lacasadediego.com',
            password: 'Brewthers123!',
        },
        {
            uid: 'sZtKjygXQuSmbp2sxuFNAhCd8Sk1',
            email: 'pablop@gmail.com',
            password: 'Brewthers123!',
        },
        //Restaurantes
        {
            uid: 'oXzRVhhJK3MMOgWu5AgwYGm7YYq1',
            email: 'darkslave@live.com',
            password: 'Brewthers123!',
        },

        {
            uid: 'vvN94b6TuBYJcmP7YHy6jnYo51t2',
            email: 'elrestaurantedediego@gmail.com',
            password: 'Brewthers123!',
        },
        // put all test users you want populated here
    ]

    const results = []
    const promises = []
    for (let user of users) {
        let promise = admin
            .auth()
            .createUser(user)
            .then(result => {
                return result
            })
            .catch(error => {
                return error.message // continue on errors (eg duplicate users)
            })

        promises.push(promise)
    }
    await Promise.all(promises).then(result => {
        results.push(result)
        return
    })
    res.header('Content-type', 'application/json')
    return res.status(200).send(JSON.stringify(results))
})

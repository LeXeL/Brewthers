const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: functions.config().emailservice.host,
    port: 465,
    secure: true,
    auth: {
        user: functions.config().emailservice.username,
        pass: functions.config().emailservice.pass,
    },
})
function templateUser01(info) {
    return `<div class="email-content">
    <p>
        Bienvenido a nuestro servicio de Moving Beer,
    Pronto estaremos atendiendo su solicitud, de necesitar alguna corrección se lo indicaremos al
    correo electrónico suministrado. De lo contrario, le llegará un correo indicando que su cuenta esta
    activa y lista para ser usada.
    Gracias ${info.restaurantName} por elegir MovingBeer, es un gusto para nosotros suministrarte la
    cerveza.
    Salud!
    </p>
  </div>`
}
function templateUser02(info) {
    return `<div class="email-content">
    <p>
    Su cuenta de ${info.restaurantName} ha sido aprobada y está lista para pedir cerveza.
    Estamos contentos de poder contar con ustedes como parte de nuestros clientes, nos
    encargaremos que la cerveza no les falte y que lo más complicado sea decidir cuál elegir. Del resto
    nos encargamos nosotros.
    Atentamente,
    
    Equipo Brewthers
    </p>
  </div>`
}
function templateUser03(info) {
    let reason = ''
    let section = info.logs[info.logs.length - 1].section
    section.forEach(element => {
        reason += `<li>${element}</li>`
    })
    return `<div class="email-content">
    <p>
    Su cuenta de (nombre comercio) ha sido rechazada porque 
   
    <ol>
          ${reason}
        </ol>

    Por favor realizar la corrección señalada dentro de su perfil creado en nuestra página web.
    En caso de existir un error, pedimos disculpas por el inconveniente y puede contactarse con
    nosotros a movingbeer3@gmail.com.
    Atentamente,

    Equipo Brewthers
    </p>
  </div>`
}
function templateUser04(info) {
    return `<div class="email-content">
    <p>
    Hola! te damos al bienvenida a la familia Brewthers!

    Un administrador va a estar evaluando tu solicitud para unirte y pronto se pondrá en contacto contigo para 
    aclarar cualquier cosa.

    Atentamente,
    
    Equipo Brewthers
    </p>
  </div>`
}
async function templateOrder01(info) {
    let cart = ''
    info.cart.forEach(element => {
        cart += `<li>${JSON.stringify(element)}</li>`
    })
    return `<div class="email-content">
    <p>
    En breve le estaremos contactando al número de teléfono suministrado en su perfil, para que
    juntos revisemos y validemos la orden generada y pasar a la preparación.
    Saludos,

    Equipo Bewthers
    </p>
  </div>`
}
async function templateOrder02(info) {
    return `<div class="email-content">
    <p>
    Ya estamos preparando tu orden ${info.id}.
    Puedes revisar el estado de tu pedido dentro de nuestra página web, pronto nos estaremos
    contactando para coordinar la entrega.
    Saludos,

    Equipo Brewthers
    </p>
  </div>`
}
async function templateOrder03(info) {
    return `<div class="email-content">
    <p>
    Estamos felices de poder decirte que la cerveza está en camino, contamos con la dirección del
    local pero puede que nuestro conductor se contacte para confirmar la hora de entrega.
    Gracias por elegir MovingBeer.

    Equipo Bewthers
    </p>
  </div>`
}
function templateOrder04(info) {
    let reason = ''
    let section = info.logs[info.logs.length - 1].section
    section.forEach(element => {
        reason += `<li>${element}</li>`
    })
    return `<div class="email-content">
        <p>
        Agradecemos tu compresión y te pedimos disculpas por los inconvenientes que hayan podido
    ocasionar este rechazo. Trataremos de hacer todo lo posible para que no vuelva a suceder.
    En caso ya hayas sido contactado para verificar tu orden, favor ignorar este correo.
    Saludos,

    Equipo Brewthers
        </p>
      </div>`
}
function templateOrder05(info) {
    // let cart = ''
    // info.cart.forEach(element => {
    //     cart += `<li>${JSON.stringify(element)}</li>`
    // })
    return `<div class="email-content">
    <p>
    Se ha generado una nueva orden del Restaurante: ${info.restaurantId.restaurantName} con numero de orden: ${info.id}
    El numero numero de telefono de contacto del restaurante es: ${info.restaurantId.contactPhone} y su correo es: ${info.restaurantId.email}
    </p>
  </div>`
}
function templateBlog01(info) {
    // console.log(info)
    return `<div class="email-content">
        <p>
        ¡Que xopa Familia!

        Tenemos nuevo artículo en nuestro blog 🙌🏼 Abre tu pinta y disfrútalo 💯

        Saludos 🍻
        </p>

        <h1>El titulo es: ${info.post.title}</h1>
        <a href="https://brewthersco.com/blog/${info.id}">Click aquí</a>

        </p>
      </div>
      
      <div>
      Si no quieres recibir mas estos mensajes haz <a href="https://brewthersco.com/unsubscribe/${info.email}">Click Aquí</a>!
      </div>`
}
function templateAdmin01(info) {
    return `<div class="email-content">
    <p>
    Tenemos una nueva solicitud de casa cervecera</br></br>

    Nombre casa cervecera: ${info.brewingHouseName}</br>
    Información de contacto: ${info.name} ${info.lastName}</br>
    Teléfono: ${info.phone}</br>
    RUC: ${info.ruc}</br>
    email: ${info.email}</br></br>

    Equipo Brewthers
    </p>
  </div>`
}

async function templateHandler(id, information) {
    if (id === 'User-01') {
        return templateUser01(information)
    }
    if (id === 'User-02') {
        return templateUser02(information)
    }
    if (id === 'User-03') {
        return templateUser03(information)
    }
    if (id === 'User-04') {
        return templateUser04(information)
    }
    if (id === 'Order-01') {
        return templateOrder01(information)
    }
    if (id === 'Order-02') {
        return templateOrder02(information)
    }
    if (id === 'Order-03') {
        return templateOrder03(information)
    }
    if (id === 'Order-04') {
        return templateOrder04(information)
    }
    if (id === 'Order-05') {
        return templateOrder05(information)
    }
    if (id === 'Blog-01') {
        return templateBlog01(information)
    }
    if (id === 'Admin-01') {
        return templateAdmin01(information)
    }
}

async function sendEmail(to, subject, template) {
    let info = await transporter.sendMail({
        from: '"Brewthers App " <no-reply@brewthersco.com>', // sender address
        to: `${to}, ${to}`, // list of receivers
        subject: `${subject}`, // Subject line
        html: `<!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                color: rgb(17, 17, 17);
              }
              .email-body {
                padding: 25px;
                font-family: Arial, Helvetica, sans-serif;
              }
              .email-logo {
                background-color: rgb(17, 17, 17);
                padding: 20px;
              }
              .email-title {
                text-align: center;
              }
              .email-content {
                padding: 20px;
                margin-bottom: 50px;
                background-color: #f0f0f0;
              }
            </style>
          </head>
          <body>
            <div class="email-logo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/brewthers-374c0.appspot.com/o/general%2Flogo-horizontal.png?alt=media&token=33016018-3f1a-44d7-831b-70ee8c1a64f7"
                width="200px;"
              />
            </div>
            <div class="email-body">
                      
              ${template}

              <p><strong>Equipo Brewthers</strong></p>
            </div>
          </body>
        </html>`, // html body
    })

    console.log('Message sent: %s', info.messageId)
    console.log(info)
}

module.exports = {
    templateHandler,
    sendEmail,
}

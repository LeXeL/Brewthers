const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
const nodemailer = require('nodemailer')

const users = require('../lib/users')
const brewery = require('../lib/brewery')
const product = require('../lib/product')
const order = require('../lib/order')

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
    Hola ${info.name} ${info.lastName} 

    Te damos la bienvenida a la aplicacion de Brewthers.

    Pronto un administrador revisara tu solicitud, si llegara a existir algo que cambiar
    te llegara un correo con los datos que pide el administrador y los podras cambiar en tu perfil dentro de la aplicacion.

    De lo contrario te enviaremos un correo cuando tu cuenta este lista y activada para que puedas realizar tus pedidos.

    Muchas Gracias.
    </p>
  </div>`
}
function templateUser02(info) {
    return `<div class="email-content">
    <p>
    Hola ${info.name} ${info.lastName} tu cuenta del restaurante ${info.restaurantName} ha sido Aprovada
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
    Hola ${info.name} ${info.lastName} tu cuenta del restaurante ${info.restaurantName} ha sido Rechasada

    Por las siguientes razones:
    <ol>
          ${reason}
        </ol>
    </p>
  </div>`
}

async function templateHandler(id, userInformation) {
    if (id === 'User-01') {
        return templateUser01(userInformation)
    }
    if (id === 'User-02') {
        return templateUser02(userInformation)
    }
    if (id === 'User-03') {
        return templateUser03(userInformation)
    }
}

async function sendEmail(to, subject, template) {
    let info = await transporter.sendMail({
        from: '"Brewthers App " <brewthers3@gmail.com>', // sender address
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
}

module.exports = {
    templateHandler,
    sendEmail,
}

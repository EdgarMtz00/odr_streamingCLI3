const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:laempresaodrsiguiosiendolamaschidadetodas
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
//firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
//https://github.com/firebase/functions-samples/tree/master/quickstarts/email-users

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Odr Streaming';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase)

// Si se esta suscrito a un holder le llenan notifaicaiones por scans, videos, audio, etc
exports.checkHolderSuscriptions = functions.https.onRequest((req, res) => {
    const idHolder = req.query.idHolder
    const titulo = req.query.titulo
    const urlHolder = req.query.urlHolder
    const urlSaga = req.query.urlSaga
    const urlMedia = req.query.urlMedia

    // Arreglo que contiene todos los usuarios suscritos a el holder
    // new Date().getTime() / 1000
    let usuarios = []
    admin.database().ref('/suscripciones/contenido/holders').once('value').then(snapshot => {
        let returnArr = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        console.log("Checando suscripcion a holders...")
        // Iterar todos los holders y filtrar por id
        returnArr.forEach(element => {
            if (element.idHolder == idHolder) {
                // Conseguir el correo del usuario con su ID, query a la base de datos
                admin.database().ref('/correo/' + element.idUsuario).once('value').then(snapshotCorreo => {
                    let val = snapshotCorreo.val()
                    if (val) {
                        console.log("snapshotCorreo.val(): ", val)
                        // Guardar usuarios suscritos a ese holder
                        usuarios.push(element.idUsuario)
                        // Si el usuario tiene activada las notificaciones por correo
                        if (val.activado) {
                            console.log("Enviando email...")
                            sendEmail ({
                                correo: val.correo,
                                idioma: val.idioma,
                                tipoContenido: 'holder', // Como esta funcion checa holders pues es holder
                                tipoNotificacion: 'contenido', // Como esta funcion checa holders pues es contenido
                                titulo: titulo,
                                urlHolder: urlHolder,
                                urlSaga: urlSaga,
                                urlMedia: urlMedia,
                            })
                        }
                    }
                })

                // Guardar usuarios suscritos a ese holder
                usuarios.push(element.idUsuario)
            }
        });
        console.log("Usuarios", usuarios)

        // Llenar base de notificaciones
        usuarios.forEach(idUsuario => {
            admin.database().ref('notificaciones/').push({
                idUsuario: idUsuario,
                tipoContenido: 'holder', // Como esta funcion checa holders pues es holder
                tipoNotificacion: 'contenido', // Como esta funcion checa holders pues es contenido
                titulo: titulo,
                urlHolder: urlHolder,
                urlMedia: urlMedia,
                urlSaga: urlSaga,
                timestamp: (new Date().getTime() / 1000), /*Un timestamp para poder ordenarlos por fecha*/
                visto: false,
            }).then(elThen => {
                admin.database().ref('notificaciones/' + elThen.key).child('idNotificacion').set(elThen.key)            
            })
        });

        // console.log(idHolder, titulo, urlHolder, urlSaga, urlMedia)
    }).catch(error => {
        console.log(error)
    })

    res.send(200)
})

exports.checkPersonajesSuscriptions = functions.https.onRequest((req, res) => {
    const idPersonaje = req.query.idPersonaje
    const nombrePersonaje = req.query.nombrePersonaje
    const tituloHolder = req.query.tituloHolder
    const urlHolder = req.query.urlHolder
    const urlSaga = req.query.urlSaga

    console.log("Checando suscripcion a personajes...")
    let usuarios = []
    admin.database().ref('/suscripciones/contenido/personajes').once('value').then(snapshot => {
        let returnArr = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        console.log("El returnArray?", returnArr)
        // Iterar todos los personajes y filtrar por id
        returnArr.forEach(element => {
            if (element.idPersonaje == idPersonaje) {
                // Conseguir el correo del usuario con su ID, query a la base de datos
                admin.database().ref('/correo/' + element.idUsuario).once('value').then(snapshotCorreo => {
                    let val = snapshotCorreo.val()
                    if (val) {
                        console.log("snapshotCorreo.val(): ", val)
                        // Guardar usuarios suscritos a ese holder
                        usuarios.push(element.idUsuario)
                        // Si el usuario tiene activada las notificaciones por correo
                        if (val.activado) {
                            sendEmail ({
                                correo: val.correo,
                                idioma: val.idioma,
                                nombrePersonaje: nombrePersonaje,
                                tipoContenido: 'personaje', // Como esta funcion checa holders pues es holder
                                tipoNotificacion: 'personaje', // Como esta funcion checa holders pues es contenido
                                titulo: tituloHolder,
                                urlHolder: urlHolder,
                                urlSaga: urlSaga,
                            })
                        }
                    }
                })
                // Guardar usuarios suscritos a ese holder
                usuarios.push(element.idUsuario)
            }
        });
        console.log("Usuarios", usuarios)

        // Llenar base de notificaciones
        usuarios.forEach(idUsuario => {
            admin.database().ref('notificaciones/').push({
                idUsuario: idUsuario,
                personaje: nombrePersonaje,
                tipoContenido: 'personaje', // Como esta funcion checa personajes pues es holder
                tipoNotificacion: 'contenido', // Como esta funcion checa personajes pues es contenido
                tituloHolder: tituloHolder,
                urlHolder: urlHolder,
                urlSaga: urlSaga,
                timestamp: (new Date().getTime() / 1000), /*Un timestamp para poder ordenarlos por fecha*/
                visto: false,
            }).then(elThen => {
                admin.database().ref('notificaciones/' + elThen.key).child('idNotificacion').set(elThen.key)            
            })
        });

        // console.log(idHolder, titulo, urlHolder, urlSaga, urlMedia)
    }).catch(error => {
        console.log(error)
    })

    res.send(200)
})

exports.checkSagasSuscriptions = functions.https.onRequest((req, res) => {
    const idSaga = req.query.idSaga
    const titulo = req.query.titulo
    const urlHolder = req.query.urlHolder
    const urlSaga = req.query.urlSaga
    const ip = req.query.ip

    let usuarios = []
    console.log("Checando suscripciones a sagas...")
    admin.database().ref('/suscripciones/contenido/sagas').once('value').then(snapshot => {
        let returnArr = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        // Iterar todos las sagas y filtrar por id
        returnArr.forEach(element => {
            let correo = '';
            if (element.idSaga == idSaga) {
                // Conseguir el correo del usuario con su ID, query a la base de datos
               admin.database().ref('/correo/' + element.idUsuario).once('value').then(snapshotCorreo => {
                   let val = snapshotCorreo.val()
                   if (val) {
                       console.log("snapshotCorreo.val(): ", val)
                       // Guardar usuarios suscritos a ese holder
                       usuarios.push(element.idUsuario)
                       // Si el usuario tiene activada las notificaciones por correo
                       if (val.activado) {
                           sendEmail ({
                               correo: val.correo,
                               idioma: val.idioma,
                               tipoContenido: 'saga', // Como esta funcion checa holders pues es holder
                               tipoNotificacion: 'contenido', // Como esta funcion checa holders pues es contenido
                               titulo: titulo,
                               urlHolder: urlHolder,
                               urlSaga: urlSaga,
                        })
                    }
                   }
               })
            }
        });
        console.log("Usuarios", usuarios)

        // Llenar base de notificaciones
        usuarios.forEach(element => {
            admin.database().ref('notificaciones/').push({
                idUsuario: idUsuario,
                tipoContenido: 'saga', // Como esta funcion checa holders pues es holder
                tipoNotificacion: 'contenido', // Como esta funcion checa holders pues es contenido
                titulo: titulo,
                urlHolder: urlHolder,
                urlSaga: urlSaga,
                timestamp: (new Date().getTime() / 1000), /*Un timestamp para poder ordenarlos por fecha*/
                visto: false,
            }).then(elThen => {
                admin.database().ref('notificaciones/' + elThen.key).child('idNotificacion').set(elThen.key)            
            })
        });

        console.log(idHolder, titulo, urlHolder, urlSaga, urlMedia)
    }).catch(error => {
        console.log(error)
    })

    res.send(200)
})

// Sends a welcome email to the given user.
function sendEmail(payload) {
  console.log("sendEmail: ", payload)
  let subject = ['Buenas noticias!', 'Good news!']
  // Tipos de notificacion
  let contenido = ['Un contenido al que sigues estreno un nuevo elemento: ---', 'A content you are following has new media: ---']
  let personaje = ['Un personaje al que sigues: *** aparecera en el nuevo contenido --- ', 'A character you are following: *** will appear in a this new content: ']

  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: payload.correo,
  };

  // Identificar el idioma del usuario para generar el correo
  let idiomaIndex = 0
  if (payload.idioma == "español") {
      idiomaIndex = 0
  } else if (payload.idioma == "ingles") {
      idiomaIndex = 1
  }
  let cuerpoCorreo = ''
  if (payload.tipoNotificacion == "contenido") {
      cuerpoCorreo = contenido[idiomaIndex]
  } else if (payload.tipoNotificacion == "personaje") {
      cuerpoCorreo = personaje[idiomaIndex]
      // Generar el nombre del personaje en el mensaje
      cuerpoCorreo = cuerpoCorreo.split('***').join(payload.nombrePersonaje);
  }
  // Reemplazar los --- por el titulo
  cuerpoCorreo = cuerpoCorreo.split('---').join(payload.titulo);
  

  mailOptions.subject = subject[idiomaIndex];
  mailOptions.text = cuerpoCorreo;

  console.log("Intentando enviar: ", mailOptions)

  return mailTransport.sendMail(mailOptions).then((resp) => {
    return console.log('Se envio un email de confimacion a:', payload.correo, resp);
  }).catch(error => {
     return console.log("No re envio correo!", error);
  });
}
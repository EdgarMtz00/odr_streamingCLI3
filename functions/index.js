const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp({
    apiKey: "AIzaSyCt8KOVPcyBES6-vVSBIZQgedl7fBPfR_w",
    authDomain: "odr-streaming.firebaseapp.com",
    databaseURL: "https://odr-streaming.firebaseio.com",
    projectId: "odr-streaming",
    storageBucket: "odr-streaming.appspot.com",
    messagingSenderId: "50680997374"
  })

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
        // Iterar todos los holders y filtrar por id
        returnArr.forEach(element => {
            if (element.idHolder == idHolder) {
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

    let usuarios = []
    admin.database().ref('/suscripciones/contenido/personajes').once('value').then(snapshot => {
        let returnArr = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        // Iterar todos los personajes y filtrar por id
        returnArr.forEach(element => {
            if (element.idPersonaje == idPersonaje) {
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

    let usuarios = []
    admin.database().ref('/suscripciones/contenido/sagas').once('value').then(snapshot => {
        let returnArr = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        // Iterar todos las sagas y filtrar por id
        returnArr.forEach(element => {
            if (element.idSaga == idSaga) {
                // Guardar usuarios suscritos a ese holder
                usuarios.push(element.idUsuario)
            }
        });
        console.log("Usuarios", usuarios)

        // Llenar base de notificaciones
        usuarios.forEach(idUsuario => {
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

        // console.log(idHolder, titulo, urlHolder, urlSaga, urlMedia)
    }).catch(error => {
        console.log(error)
    })

    res.send(200)
})
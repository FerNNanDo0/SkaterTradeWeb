// Import the functions you need from the SDKs you need
import {
  getDatabase,
  ref,
  onValue
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import {
  getAuth,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//import script from "./script-pagina";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM2F0b1m8MiivEEtfeCetkXzhZcRkDEjo",
  authDomain: "skatertrade.firebaseapp.com",
  databaseURL: "https://skatertrade-default-rtdb.firebaseio.com",
  projectId: "skatertrade",
  storageBucket: "skatertrade.appspot.com",
  messagingSenderId: "1045728109826",
  appId: "1:1045728109826:web:0667c0397e5f9f66d10e1b",
  measurementId: "G-K784XRLP2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
//Initialize Auth and get a reference to the service
const auth = getAuth(app);
const userId = '';


onAuthStateChanged(auth, user => {
  // Check for user status
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    userId = user.uid;
    console.log("UserId: " + userId)
    // ...
  } else {
    // User is signed out
    // ...
    console.log("Usuario nao esta logado")
  }

});

// lista de anuncios
const anuncios = [];

// obter dados anuncios publico do db
async function getAnuncios() {
  // referencia dos anuncios
  const anunciosRef = ref(db, 'anuncios');
  onValue(anunciosRef, (snapshot) => {

    // percorer os estados
    var estados = snapshot.val();
    for (var estado in estados) { // for 1

      // percorer as categorias
      var categorias = snapshot.child(estado).val();
      for (var categoria in categorias) { // for 2

        // percorer os Ids dos anúncios
        var idsAnuncio = snapshot.child(estado).child(categoria).val();
        for (var id in idsAnuncio) { // for 3

          // recuperar o anúncio
          var anuncio = snapshot.child(estado).child(categoria).child(id);
          anuncios.push(anuncio);

          /*var titulo = anuncio.child("titulo").val();
          var descricao = anuncio.child("desc").val();
          var phone = anuncio.child("phone").val();
          var valor = anuncio.child("valor").val();
          var estadoAnuncio = anuncio.child("estado").val();*/
        } // for 3
      } // for 2
    } // for 1

    let htmlList = $('#list-itens');
    let item = '';

    // anuncios.forEach( (anuncio) => {
    //     console.log(anuncio.child("titulo").val());
    // });

    // Loop para imprimir de 3 em 3 objetos
    for (let i = 0; i < anuncios.length; i += 3) {
      const batch = anuncios.slice(i, i + 3);
      let nameOne = batch[0]
      let nameTwo = batch[1]
      let nameThree = batch[2]

      var linkImgOne = nameOne.child("fotos").val().slice(0, 1).toString();
      var linkImgTwo = nameTwo.child("fotos").val().slice(0, 1).toString();
      var linkImgThree = nameThree.child("fotos").val().slice(0, 1).toString();


      item += 
        `
        <!-- linha 1 -->
        <div class="row mb-3 mt-3 text-center">
          <!-- produto - 1 -->
          <div class="col-4 pl-md-5 p-0">
            <a href="#" class="card-link" id="elevacao">
              <div id="div-imgs">
                <img src="${linkImgOne}" class="img-fluid">
                <h5 class="titulo text-truncate">${nameOne.child("titulo").val()}</h5>
                <p class="real">${nameOne.child("valor").val()}</p>
              </div> 
            </a>
          </div>
          <!-- produto - 2 -->
          <div class="col-4 pl-md-5 p-0">
            <a href="#" class="card-link" id="elevacao">
              <div id="div-imgs">
                <img src="${linkImgTwo}" class="img-fluid">
                <h5 class="titulo text-truncate">${nameTwo.child("titulo").val()}</h5>
                <p class="real">${nameTwo.child("valor").val()}</p>
              </div>
            </a>
          </div>
          <!-- produto - 3 -->
          <div class="col-4 pl-md-5 p-0">
            <a href="#" class="card-link" id="elevacao">
              <div id="div-imgs">
                <img src="${linkImgThree}" class="img-fluid">
                <h5 class="titulo text-truncate">${nameThree.child("titulo").val()}</h5> 
                <p class="real">${nameThree.child("valor").val()}</p>
              </div>
            </a>
          </div>
        </div>
        `
        $(htmlList).html(item);
  }

  });// onValue
}// getAnuncios

// obter dados meus_anuncios do db
async function getMeusAnuncios() {
  const meus_anunciosRef = ref(db, 'meus_anuncios/' + userId);
  onValue(meus_anunciosRef, (snapshot) => {

    const data = snapshot.val();
    //updateStarCount(postElement, data);
    console.log("anúncios do usuário logado: " + data)
  });
}

// ==> salvar dados no firabase-database
async function salvarDados(id, nome, descricao, valor, urlImage, estado, categoria) {

  set(ref(database, 'anuncios/' + estado + categoria + id), {
    nomeProd: nome,
    descriProd: descricao,
    valorProd: valor,
    urlImgProd: urlImage
  });

  set(ref(database, 'meus_anuncios/' + userId), {
    nomeProd: nome,
    descriProd: descricao,
    valorProd: valor,
    urlImgProd: urlImage
  });
}


getAnuncios();
//getMeusAnuncios();
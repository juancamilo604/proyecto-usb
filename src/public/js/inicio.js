document.addEventListener('DOMContentLoaded', () => {
  // cargarLoader('Cargando...');

  // verifica si tengo notificaciones pendientes
  // getData('/pbs/tengoNotiInicio').then(arrObjNoti => {
  //   if (arrObjNoti) {

  //     let contenido = '';
  //     let arrIdNoti = [];

  //     // console.log(arrObjNoti);
  //     arrObjNoti.forEach(obj => {

  //       arrIdNoti.push(obj.idNoti);

  //       if (obj.imagen) {
  //         contenido += `
  //         <div class="card horizontal">
  //           <div class="card-image">
  //             <img class="materialboxed img_noti" src="/doc/img/${obj.imagen}">
  //           </div>
  //           <div class="card-stacked">
  //             <div class="card-content">
  //               <p>${obj.texto}</p>
  //             </div>
  //           </div>
  //         </div>`;
  //       } else {
  //         contenido += `
  //         <div class="card horizontal">
  //           <div class="card-stacked">
  //             <div class="card-content">
  //               <p>${obj.texto}</p>
  //             </div>
  //           </div>
  //         </div>`;
  //       }
  //     });

  //     document.querySelector('#modalNotiInicial').setAttribute('data-arrNoti', arrIdNoti);
  //     document.querySelector('#contModalNoti').innerHTML = contenido;

  //     // agrandador de imagenes
  //     M.Materialbox.init(document.querySelectorAll('.materialboxed'));

  //     // abre modal, en caso de que tenga notificaciones 
  //     const modalNotificacion = M.Modal.getInstance(document.querySelector('#modalNotiInicial'));
  //     modalNotificacion.open();

  //     ocultarLoader();

  //   } else {
  //     // Sin notificaciones
  //     updateLogueo();
  //   }
  // });
});
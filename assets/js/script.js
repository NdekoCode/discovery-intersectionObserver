/**
 * @description La fonction que l'on souhaite ecouter dans notre API, c'est un callBack, elle sera appeler à chaque fois qu'il y a une nouvelle intersection
 * @author NdekoCode
 * @param {IntersectionObserverEntry} entries les elements sur lesquels on va ecouter les intersection
 */
function handleEntries (entries) {
  entries.forEach(entry => {
    console.log(entry);
    // Si les images entre dans notre viewPort(Dans la fenetre du navigateur alors on les affiches)
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    } else {
      entry.target.style.opacity = "0";
    }
  })
}

/** @type {Object} options Les parametres à prendre en contre dans nos intersections */
const options = {
  root: null,
  rootMargin: "-10% 0px",
  
  treshold:[0]
};

/** @type {IntersectionObserver} Notre Observeur */
const observer  = new IntersectionObserver(handleEntries, options);

/** @type {NdeList} Les elements que l'on souhaite observer */
const images = document.querySelectorAll('.images-container img');
images.forEach(img => {
  observer.observe(img);
});


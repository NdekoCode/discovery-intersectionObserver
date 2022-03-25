/** @type {number} Le ratio en pourcentage qui sera considerer pour que l'element soit visible dans la page */
const ratio = 0.6;
/** @type {NodeList[]} Les elements que l'on veut observer */
const spies = document.querySelectorAll('[data-spy]');

/** @type {IntersectionObserver} On initialise notre Observer et Permettra de desactiver ou pas les observateur preceden*/
let observer = null;


/**
 * @description Permet de mettre la classe active à un element HTML par son id
 * @param {HTMLElement} element
 * @author NdekoCode
 */
const activateElement = function (element) {
  const id = element.getAttribute('id');
  
      // Un lien dont l'attribut href contient #id
  const anchor = document.querySelector(`a[href*="#${id}"]`);

  // Si c'est null alors pas la peine d'aller plus loin
  if (anchor === null) {
    return null;
  }

  const parent = anchor.parentElement.parentElement;
  parent.querySelectorAll('a.active').forEach(link => link.classList.remove('active'));

  anchor.classList.add('active');

}

/**
 * @description La fonction à appeler lorsque un element rentre ou sort de la zone d'affichage
 * @param {IntersectionObserverEntry []} entries Les elements qui viennent de rentrer ou qui viennent de sortir de la zone d'affichage
  *  @param {IntersectionObserver} observer L'IntersectionObserver qui est actuellemet affecter par mon systeme de callback
 * @author NdekoCode
 */
const handleIntersect = (entries, observer) => {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      activateElement(entry.target);
      
    }
  })
}


// 

/**
 * @description Permet de creer un Observer Pour gerer plusieurs cas selon que l'on redimensionne l'ecran ou de l'ecran normal
 * @param {NodeListOf.<Element>} elements 
 * @author NdekoCode
 */
const observe = function (elements) {
  if (observer !== null) {
    console.log("A observe")
    elements.forEach (element => observer.unobserve(element));
  }

  /** @type {number} Permettra de gerer la marge negative pour les element d'une grande hauteur à fin de faire en sorte qu'il soit toujours observer */
  const y = Math.round(window.innerHeight * ratio);
  
  /** @type {number} Permet de faire en sorte que l'intersectionObserver soit une simple bar de 1px, ainsi on creer une barre à la place d'un rectangle au niveau de l'intersectionObserver*/
  const spaceY =window.innerHeight - y - 1;

  
  observer = new IntersectionObserver(handleIntersect, {
    // On doit mettre une marge negative qui est egale à 60% de la taille de l'écran avec `y` et en au on remet la barre de L'Observer à 1px avec spaceY
    rootMargin: `-${spaceY}px 0px -${y}px 0px`
  });

  // On parcour nos elements pour les observer
  elements.forEach (spy => {
    // Sur chaque element on y greffe un observateur
    observer.observe(spy);
  });
}

/**
 * @description Permet d'appeler une fonction après un delait et ainsi eviter qu'une fonction soit appeler plusieur fois comme par exemple lors d'un "scroll" ou d'un "resize"
 * @param {Function} callback
 * @param {number} delay
 * @return {Function} 
 * @author NdekoCode
 */
const debounce = function (callback, delay) {
  let timer;
  return function(){
      const args = arguments;
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(function(){
          callback.apply(context, args);
      }, delay)
  }
}
// Si on a pas d'element que l'on souhaite espionner alors ce n'est meme pas la peine de créer un observeur
if (spies.length > 0) {
  observe(spies);
  // On resize on lance une fonction qui aura comme role de relancer l'observation des espions
  // On va debouncer cette fonction par: On va lui dire, ne lance pas directement l'observer mais debounnce cette fonction sur 500ms ie quand l'utilisateur arrete de redimensionner juste apres 500 ms appele cette fonction
  window.addEventListener('resize', debounce (function () {
    observe(spies);

  }, 300));

}

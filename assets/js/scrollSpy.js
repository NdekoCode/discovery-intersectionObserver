/** @type {number} Le ratio en pourcentage qui sera considerer pour que l'element soit visible dans la page */
const ratio = 0.6;


/**
 * Freshold
 */
// const threshold = 0;


/**
 * @description Permet de mettre la classe active à un element HTML par son id
 * @author NdekoCode
 * @param {HTMLElement} element
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
 * @author NdekoCode
 * @param {IntersectionObserverEntry []} entries Les elements qui viennent de rentrer ou qui viennent de sortir de la zone d'affichage
  *  @param {IntersectionObserver} observer L'IntersectionObserver qui est actuellemet affecter par mon systeme de callback
 */
const handleIntersect = (entries, observer) => {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      activateElement(entry.target);
      
    }
  })
}

const spies = document.querySelectorAll('[data-spy]');

// Pour gerer plusieurs cas selon la largeur de l'écran

/**
 * @description
 * @author NdekoCode
 * @param {NodeListOf.<Element>} elements 
 */
const observe = function (elements) {

  const y = Math.round(window.innerHeight * ratio);
  
  // Permet de faire en sorte que l'intersectionObserver soit une simple bar de 1px, ainsi on creer une barre à la place d'un rectangle au niveau de l'intersectionObserver
  const spaceY =window.innerHeight - y - 1;

  /** @type {IntersectionObserver} On initialise notre Observer*/
  const observer = new IntersectionObserver(handleIntersect, {
    // On doit mettre une marge negative qui est egale à 60% de la taille de l'écran
    rootMargin: `-${spaceY}px 0px -${y}px 0px`
  });

  // On parcour nos elements pour les observer
  elements.forEach (spy => {
    // Sur chaque element on y greffe un observateur
    observer.observe(spy);
  });
}
// Si on a pas d'element que l'on souhaite espionner alors ce n'est meme pas la peine de créer un observeur
if (spies.length > 0) {
  observe(spies);

}

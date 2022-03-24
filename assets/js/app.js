// Dans cet exercice Mon principe c'est de detecter lorsque l'element devient visible au niveau de ma page
// Pour notre cas on va commencer par les element qui ont la classe `image`

let observer = new IntersectionObserver(function (entries) {
  entries.forEach(entrie => {
    if(entrie.intersectionRatio > 0.5) {
      // Quand l'element est visible on lui supprime la classe
      entrie.target.classList.remove('not-visible');
      // Pour optimiser les choses lorsque j'ai rend un element visible je peux maintenant le retirer de la liste des elements observer
      // observer.unobserve(entrie.target);  
    } else {
      // Si l'element ne pas visible à 50% on lui ajoute la classe
      entrie.target.classList.add('not-visible');
    }
  } )
}, {
  threshold: [0.5]
});
// Les elements que l'on souhaite Observer
let items = document.querySelectorAll('.text, .image');
items.forEach( item => {
  // Avant que l'element ne soit observer on lui ajoute une classe qu'on va retirer quand il sera visible dans le `root`
  item.classList.add('not-visible')
  // On observe cet element
  observer.observe(item);
})

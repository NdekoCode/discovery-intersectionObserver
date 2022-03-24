
window.addEventListener('DOMContentLoaded',() => {
  let observer = new IntersectionObserver(observables => {
    for(let item of observables) {
      console.log(item.intersectionRatio)
      // La condition doit aller de paire avec ce que l'on propose dans threshold
      console.log(item.isIntersecting);
      if(item.intersectionRatio > 0.4) {
        item.target.classList.remove('hidden');
      } else {
        item.target.classList.add('hidden');
      }
    }
  },{
    threshold: [0.4]
  });
  // On recupere les sections
  const sections = document.querySelectorAll('main > section');
  for (let item of sections) {
    item.classList.add('hidden');
    observer.observe(item);
  }
});

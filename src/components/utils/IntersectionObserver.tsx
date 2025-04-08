import { RefObject } from 'react';

const MyIntersectionObserver = (imageRefs: RefObject<HTMLImageElement[]>) => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const image = entry.target as HTMLImageElement;
              image.src = image.dataset.src ?? "";
              observer.unobserve(image);
            }
          });
        },
        {
          rootMargin: "50px",
        }
      );
  
      imageRefs.current.forEach((image) => {
        observer.observe(image);
      });
      // if the element has not intersected, observer stores this iterated image elements in its internal storage which is not directly accessible. When an observed element intersects with the viewport (or the root element), the observer adds an IntersectionObserverEntry object to the entries array, which is then passed to the callback function.

  
      return () => {
        observer.disconnect();
      };
  
  
}
export default MyIntersectionObserver;

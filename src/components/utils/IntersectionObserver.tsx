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
  
      return () => {
        observer.disconnect();
      };
  
  
}
export default MyIntersectionObserver;

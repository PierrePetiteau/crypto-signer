export function scrollToElement(id: string) {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    (targetElement as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTopOfDiv(id: string) {
  const divElement = document.getElementById(id);
  if (divElement) {
    divElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
export function scrollToTopOfPage() {
  scrollToTopOfDiv("page-container");
}

export function scrollToBottomOfDiv(id: string) {
  const divElement = document.getElementById(id);
  if (divElement) {
    divElement.scrollTo({
      top: divElement.scrollHeight,
      behavior: "smooth",
    });
  }
}

export function scrollToBottomOfPage() {
  scrollToBottomOfDiv("page-container");
}

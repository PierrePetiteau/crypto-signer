export function toogleCheckboxInput(id: string) {
  const checkbox = document.getElementById(id) as HTMLInputElement;
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
  }
}

export function checkCheckboxInput(id: string) {
  const checkbox = document.getElementById(id) as HTMLInputElement;
  if (checkbox && !checkbox.checked) {
    checkbox.checked = true;
  }
}

export function uncheckCheckboxInput(id: string) {
  const checkbox = document.getElementById(id) as HTMLInputElement;
  if (checkbox && checkbox.checked) {
    checkbox.checked = false;
  }
}

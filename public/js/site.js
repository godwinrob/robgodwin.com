// Open interest dialogs, close on backdrop click, and keep the footer year current.
document.querySelectorAll('[data-dialog]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.dialog);
  if (!dialog) return;
  trigger.addEventListener('click', () => dialog.showModal());
  // Close only when both press and release land on the backdrop, so dragging
  // a text selection out of the dialog doesn't dismiss it.
  let pressedOnBackdrop = false;
  dialog.addEventListener('pointerdown', (e) => { pressedOnBackdrop = e.target === dialog; });
  dialog.addEventListener('click', (e) => {
    if (pressedOnBackdrop && e.target === dialog) dialog.close();
    pressedOnBackdrop = false;
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

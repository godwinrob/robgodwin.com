// Open interest dialogs, close on backdrop click, and keep the footer year current.
document.querySelectorAll('[data-dialog]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.dialog);
  if (!dialog) return;
  trigger.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

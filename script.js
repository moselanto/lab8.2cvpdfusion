// "Download PDF" opens the browser print dialog (choose "Save as PDF").
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('download-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      window.print();
    });
  }
});

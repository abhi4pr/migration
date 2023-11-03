// Wow JS
wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

//Remove Class
$(document).on("click", ".delete", function (e) {
  e.preventDefault();
  $(this).closest(".doc_item_active").removeClass("doc_item_active");
  return false;
});

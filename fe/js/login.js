const END_PONIT = require("./constant.js");

$(document).ready(function() {
  $("#formLogin").submit(function(e) {
    var data = $(this).serializeArray();

    function checkData() {
      if (data[0].value.trim() && data[1].value.trim()) return true;
      return false;
    }
    e.preventDefault();
    if (checkData) {
      $.ajax({
        type: "post",
        url: "url",
        data: "data",
        dataType: "dataType",
        success: function(response) {}
      });
    }
  });
});

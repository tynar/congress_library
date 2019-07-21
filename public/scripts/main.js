$(document).ready(function () {
  $('a[name=btnDeleteFeedback]').click(function () {
    var id = $(this).data("id");
    $.ajax({
      url: '/feedbacks',
      type: 'DELETE',
      data: { "id": id },
      dataType: 'json',
      success: function (data) {
        console.log(data);
      }
    });
  });
}
);

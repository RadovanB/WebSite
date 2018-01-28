var temp = $("#template").html();
var title = new RegExp('{{title}}', 'g');
var colections = $("[data-collection]");
var mainRow = $("#mainRow");
window.onload = function() {
  colections.parent().removeClass('active');
  $.ajax({
    url : "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
    method : "get",
    dataType : "json"
  })
  .done(function (res) {
      displayCollections(res);
      colections.on('click', function() {
        displayCollections.call(this, res);
      });
  })
};


$(".back-to-top").click(function () {
    $("html, body").animate({scrollTop: 0}, 1000);
});
//
// function display() {
//   mainRow.html("");
//   $.ajax({
//     url : "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
//     method : "get",
//     dataType : "json"
//   })
//   .done(function (res) {
//    console.log(res);
//    var text = " ";
//    res.forEach(function (e) {
//      text = temp.replace("{{imgSrc}}", e.imgSrc)
//                         .replace(title, e.productTitle)
//                         .replace("{{model}}", e.model)
//                         .replace("{{price}}", e.price);
//     mainRow.append(text);
//    })
//   });
// }


function displayCollections(res) {
  mainRow.html("");
    event.preventDefault();
    var col = $(this).data('collection');
    console.log(this);
    // $.ajax({
    //   url : "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
    //   method : "get",
    //   dataType : "json"
    // })

      if (col==='male' || col==='female') {
        var colFilter = res.filter(function(el) {
          return el.colection === col;
        });
      displayProduct(colFilter);
      }else if(col === "newCol" || col==="popular" || col==="action"){
        colections.parent().removeClass('active');
        $(this).parent().addClass('active');
          var colFilter = res.filter(function(el) {
                return el[col];
          });
        displayProduct(colFilter);
      }else {
        displayProduct(res);
      }

      function displayProduct(filter) {
        var text = "";
        filter.forEach(function (e) {
          text = temp.replace("{{imgSrc}}", e.imgSrc)
                             .replace(title, e.productTitle)
                             .replace("{{model}}", e.model)
                             .replace("{{price}}", e.price);
         mainRow.append(text);
        })
      }
}

//CREATE
$("input").keypress(function(event) {
    if (event.which === 13 && $(this).val() !== "") {
      var todoItem = {
        description: $(this).val()
      }//USE body-parser
      $.ajax({
        url: todoURL,
        method: 'POST',
        data: todoItem
      })
      .done(function(newToDo){
        $('ul').append(
          `<li data-id=${newToDo.id}>${newToDo.description}<span><i class='far fa-trash-alt'></i></span></li>`
        );
          $("input").val("");
      })
      .fail(function(errorObj){
        console.error('Error receivng new todo.')
      })

}});
  
  const todoURL = 'http://localhost:3000/todos'

  //READ
  $(document).ready(function(){
    $.ajax({
      url: todoURL,
      method: "GET"
    })
    .done(function(dataObj){
      console.log(dataObj)
      $('ul').empty();
      dataObj.map(function(toDo){
        let completed = toDo.isComplete ? "completed": "";
        $('ul').append(
          `<li data-id=${toDo.id} class=${completed}>${toDo.description}<span><i class='far fa-trash-alt'></i></span></li>`
        )
      })
    })
    .fail(function(errorObj){
      console.error('Issues reading data from server.')
    })
  })

  //UPDATE
  $('ul').on('click', 'li', function(){
    let self = this;
    let thisTodoId = $(this).data('id')
    $.ajax({
        url: `${todoURL}/${thisTodoId}`,
        method: 'PUT'
    })
    .done(function(){
        $(self).toggleClass('completed');
    })
    .fail(err => console.log(`Issues with trying to update class: ${err}`))
});

  

  //DELETE
  $("ul").on("click", "span", function(event) {
    // console.log(this)
    event.stopPropagation()
    let thisId = $(this).parent().data('id')
    let self = this;
    $.ajax({
      url: `${todoURL}/${thisId}`,
      method: 'DELETE'
    })
    .done(function(){
    $(self).parent().remove();

    })
    .fail(function(err){
      console.error('Issue deleting todo on backend')
    })
  });
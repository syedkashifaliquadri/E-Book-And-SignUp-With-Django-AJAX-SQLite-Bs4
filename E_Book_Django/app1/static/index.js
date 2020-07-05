window.onload = initAll;

var saveBookButton;
var showBooks;

function initAll(){
    saveBookButton = document.getElementById('save_book');
    saveBookButton.onclick = saveBook;

    
}


function showAllBooks(){
    var req = new XMLHttpRequest();
    var url = '/getAllBooks'
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {      // ye request send kar raha hai servr ko
            var data = eval(req.responseText);
            // alert(data[0].name)
            var div = document.getElementById("nav-profile");
            div.innerHTML = "";

            var table = document.createElement("TABLE");

            var row = table.insertRow(0);
            var name = row.insertCell(0);
            var prize = row.insertCell(1);
            var pages = row.insertCell(2);
            var clicktodelete = row.insertCell(3);

            name.innerHTML = "Book Name";
            prize.innerHTML = "Book Prize";
            pages.innerHTML = "Book Pages";
            clicktodelete.innerHTML = "Click To Delete";
            


            for(var i = 0 ; i < data.length ; i++){
                var row = table.insertRow(i+1);
                var name = row.insertCell(0);
                var prize = row.insertCell(1);
                var pages = row.insertCell(2);
                var deletebook = row.insertCell(3);

                name.innerHTML = data[i].name;
                prize.innerHTML = data[i].prize;
                pages.innerHTML = data[i].pages;
                deletebook.innerHTML = '&times';
                deletebook.className = 'text-danger text-center';
                deletebook.style.fontSize = '25px';
                deletebook.style.cursor = 'pointer';
                deletebook.id = data[i].id;
                deletebook.className = 'deleteButton';

                deletebook.onclick = function(){
                    var obj = this;
                    var id = this.id;
                    var url = '/deletebook?id='+id;
                    var req = new XMLHttpRequest();
                    req.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            if(req.responseText == 'true'){
                                table.deleteRow(obj.parentNode.rowIndex)
                            }
                            
                        }
                    };
                    req.open("GET", url, true);
                    req.send();
                }
            }

            table.className = 'table text-center table-striped';
            div.appendChild(table);
        }
    };
    req.open("GET", url, true);
    req.send();
}



function saveBook(){

    var name = document.getElementById("book_name").value;
    var prize = document.getElementById("book_prize").value;
    var pages = document.getElementById("book_pages").value;

    var url = '/save_book?name='+name+'&prize='+prize+'&pages='+pages;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(req.responseText == 'true'){
                var name = document.getElementById("book_name").value = '';
                var prize = document.getElementById("book_prize").value = '';
                var pages = document.getElementById("book_pages").value = '';   
            }
        }
    };
    req.open("GET", url, true);
    req.send();
}
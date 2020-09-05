// JavaScript Document
var list=document.getElementById("list");

//firebase sai data get kerna data parameter mai jitnai object mai milagai
firebase.database().ref('todos').on('child_added',function(data){
	//console.log(data.val())   check value abi rehi hai kai nahi
	
	//create li tag element by js 
	var li =document.createElement("li")
	var liText=document.createTextNode(data.val().value)  //firebase sai value get	
		li.appendChild(liText)
	
	//create delete buttonelement by js button
	var delBtn=document.createElement("button")  
	var delText=document.createTextNode("DELETE")
	delBtn.setAttribute("class","btn")
	delBtn.setAttribute('id',data.val().key)
	delBtn.setAttribute("onclick","deleteItem(this)")//this button arguments pass
	delBtn.appendChild(delText)
	
	//create edit button
	var editBtn=document.createElement("button")
	var editText=document.createTextNode("EDIT")
	editBtn.setAttribute("class","btnEdit")
	
	editBtn.appendChild(editText)
	editBtn.setAttribute('id',data.val().key)
	editBtn.setAttribute("onclick","editItem(this)")
	
	li.appendChild(delBtn)	
	li.appendChild(editBtn)
	list.appendChild(li)
})


//js sai firbase mai--------------------------
function addTodo(){
	var todo=document.getElementById("todo")         //getid
	var key=firebase.database().ref('todos').push().key        //reference                        
	var todo={  
	value:todo.value,                                  //object		value:todo.value,               
	key:key
	}
	
	firebase.database().ref('todos').child(key).set(todo);
	todo.value=""
}

function editItem(e){
	console.log(e.id)
	var val=prompt("Enter Value Update",e.parentNode.firstChild.nodeValue)
	var editTodo={
		value:val,
		key:e.id
	}
	firebase.database().ref('todos').child(e.id).set(editTodo)
	//console.log(editTodo)
	e.parentNode.firstChild.nodeValue=val;
}


////check connection db connect firebase?
////console.log(firebase)
//
////!!!!!!!!!!!!!!!!!!!!!!!!!!!!data get proper format  //on for real time
////firebase.database().ref('todos').on('child_added',function(data){
//	//console.log(data.val())
//	
//	//create li tag element by js 
//	var li =document.createElement("li")
//	//=====var liText=document.createTextNode("Ghous Sir") 
//	var liText=document.createTextNode(data.val().value)  //user value get	
//		li.appendChild(liText)
//	
//	//create delete buttonelement by js button
//	var delBtn=document.createElement("button")  
//	var delText=document.createTextNode("DELETE")
//	delBtn.setAttribute("class","btn")
//	delBtn.setAttribute("onclick","deleteItem(this)")//this button arguments pass
//	delBtn.appendChild(delText)
//	
//	//create edit button
//	var editBtn=document.createElement("button")
//	var editText=document.createTextNode("EDIT")
//	editBtn.setAttribute("class","btnEdit")
//	//editBtn.setAttribute("class","fa fa-pencil")
//	editBtn.appendChild(editText)
//	editBtn.setAttribute("onclick","editItem(this)")
//	
//	li.appendChild(delBtn)	
//	li.appendChild(editBtn)
////	li.appendChild(liText)   //text bi node  hota hai js mai    innerhtml kai bajaye appendchild
//
//	list.appendChild(li)	
//)      	
//parameter e this  any parameter get button del yaani parameter get e this full element pass


function deleteItem(e){
	//console.log(e.id)
	
	firebase.database().ref('todos').child(e.id).remove()
	e.parentNode.remove();
}

	//Because meri value right side hai islia lastchild or sir ki lefttou sirnai firstchild
	
	//e.parentNode.lastChild.nodeValue="Ali"   update
	//console.log(e.parentNode.lastChild)
	//UPDATE
	//1.console.log(e)   2.console.log(e.parentNode)  three childe mujai text chia tha wo last child hai 3.console.log(e.parentNode.lastChild)   4.console.log(e.parentNode.lastChild.nodeValue) 
	//""""""""""""UPDATE 1 method!!!!!!!!
//	var val=e.parentNode.lastChild.nodeValue;
//	var editValue=prompt("Enter Edit Value",val)  //prompt for update user value
//	e.parentNode.lastChild.nodeValue=editValue
	///new two lines update---------------------------
	//var val=prompt("Enter Value Update",e.parentNode.lastChild.nodeValue)
	//e.parentNode.lastChild.nodeValue=val;
//}

function deleteAll(){
	firebase.database().ref('todos').remove()
	list.innerHTML="";
}
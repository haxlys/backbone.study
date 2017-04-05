/* collection - Model의 세트 */

var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo // model 설정
});

var myTodo1 = new Todo({title:'Read the whole book'}),
    myTodo2 = new Todo({title:'eat breakfast'}),
    myTodo3 = new Todo({title:'sleep tonight'});

// collection에서 Model 추가 제거
var todos = new TodosCollection([myTodo1, myTodo2]);
console.log("Collection size: " + todos.length);
todos.add(myTodo3); // add로 컬렉션에 추가
console.log("Collection size: " + todos.length);
todos.remove([myTodo1, myTodo2]); // remove로 컬렉션에서 제거
console.log("Collection size: " + todos.length);

// Model 조회
/* key 속성으로 id, cid, idAttribute 사용
idAttribute : 서버에서 반환되는 모델의 속성을 식별
cid : backbone에 의해서 생성된 모델 속성을 식별
*/
var myTodo = new Todo({title:'Read the whole book', id:2});
var todos = new TodosCollection([myTodo]);
console.log(todos.get(2));
console.log(todos.get(myTodo.cid));

// 이벤트 리스
var TodosCollection = new Backbone.Collection();
TodosCollection.on("add", function(todo){ //model add 리스너
  console.log("I should " + todo.get("title") + ". Hava I done it before? " + (todo.get("completed") ? 'Yeah!': 'No.'));
});
TodosCollection.on("change:title", function(todo){ // model title 속성 변경 리스너
  console.log("chagne my mind");
});
TodosCollection.add([
  {title: 'go to Jamaica', completed: false ,id:1},
  {title: 'go to China', completed: false ,id:2},
  {title: 'go to Korea', completed: true ,id:3}
]);
TodosCollection.get(1).set('title', 'zz');

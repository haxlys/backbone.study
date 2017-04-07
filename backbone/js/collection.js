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

//****** collection에서 Model 추가 제거 *******//
var todos = new TodosCollection([myTodo1, myTodo2]);
console.log("Collection size: " + todos.length);
todos.add(myTodo3); // add로 컬렉션에 추가
console.log("Collection size: " + todos.length);
todos.remove([myTodo1, myTodo2]); // remove로 컬렉션에서 제거
console.log("Collection size: " + todos.length);

//****** Model 조회 *******//
/* key 속성으로 id, cid, idAttribute 사용
idAttribute : 서버에서 반환되는 모델의 속성을 식별
cid : backbone에 의해서 생성된 모델 속성을 식별 */
var myTodo = new Todo({title:'Read the whole book', id:2});
var todos = new TodosCollection([myTodo]);
console.log(todos.get(2));
console.log(todos.get(myTodo.cid));

//****** 이벤트 리스닝 *******//
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

//****** once() *******//
// 특정 작업을 한번만 수행해야 할 경우 사용하는 함수
var TodoCounter = { counterA: 0, counterB: 0 };
_.extend(TodoCounter, Backbone.Events); // _.extend({name: 'moe'}, {age: 50}); => {name: 'moe', age: 50}
console.log(Backbone.Events); // Events를 확인해 보면 bind(),listenTo(),listenToOnce(),once()... 다양한 함수가 들어있음을 확인.
var incrA = function(){
  TodoCounter.counterA += 1;
  TodoCounter.trigger('event1'); // ? trigger 개념을 이해 하지 못함
};

var incrB = function(){
  TodoCounter.counterB += 1;
};

TodoCounter.once('event1', incrA); // event1이란 name으로 incrA 함수 이벤트 등록
TodoCounter.once('event1', incrB); // once()는 한번 호출 뒤 다신 실행 안됨.

TodoCounter.trigger('event1');
// trigger() : 'event1'으로 등록된 이벤트 실행
// once에 등록해 놓은 event1 함수 incrA, incrB 함수가 실행됨.
// 만약 once가 아닌 on으로 이벤트 등록할 경우 incrA 함수에 정의한 trigger()가 무한히 실행되며 Maxium call stack 에러가 남

console.log(TodoCounter.counterA);
console.log(TodoCounter.counterB);

//****** set() *******//
var TodosCollection = new Backbone.Collection();
TodosCollection.add([
  {id: 1, title: 'go to Jamaica.', completed: false },
  {id: 2, title: 'go to China.', completed: false },
  {id: 3, title: 'go to Desneyland.', completed: true }
]);

// add/change/remove 이벤트를 리스닝할 수 있다.
TodosCollection.on("add", function(model){
  console.log("Added " + model.get('title'));
});
TodosCollection.on("remove", function(model){
  console.log("Removed " + model.get('title'));
});
TodosCollection.on("change:completed", function(model){ // 리스닝종류:키명
  console.log("Completed " + model.get('title'));
});

TodosCollection.set([
  {id: 1, title: 'go to Jamaica.', completed: true },
  {id: 2, title: 'go to China.', completed: false },
  {id: 4, title: 'go to Desney Wolrd.', completed: false }
]);
// Completed go to Jamaica. - 1 competed 변경
// Removed go to Desneyland. - 3 삭제
// Added go to Desney Wolrd. - 4 추가

//****** reset() *******//
// reset() : reset은 별도의 이벤트 리스닝 함수 reset이 존재한다.
TodosCollection.on("reset", function(){
  console.log("Reset");
});

TodosCollection.reset([
  {id: 1, title: 'go to Jamaica.', completed: true }
]);
console.log(TodosCollection.length); // 1

//모두 지우고 싶을 경우 인자 없이 reset() 호출
TodosCollection.reset();
console.log(TodosCollection.length); // 0

//****** options.previousModels *******//
// 만약 reset 리스너로 변경되기 전 값에 접근하고 싶을 경우 options.previousModels 접근
var Todo = new Backbone.Model();
var Todos = new Backbone.Collection([Todo])
  .on("reset", function(newModel, options){
    console.log(newModel);
    console.log(options);
    console.log([Todo]);
    console.log(options.previousModels[0] === Todo);
});
var newTodo = new Backbone.Model();
Todos.reset([newTodo]);

var theBeatles = new Backbone.Collection(['john', 'paul', 'george', 'ringo']);
theBeatles.update(['john', 'paul', 'george', 'pete']);

var App = App || {};
// Backbone View

// View 예제
var TodoView = Backbone.View.extend({
  tagName: 'li', // 지정하지 않으면 default : div

  //단일 항목을 위한 템플릿 함수
  todoTpl: _.template("An example template"),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  render: function() {
    this.$el.html( this.todoTpl( this.model.toJSON() ));
    // this.$el -> $(this.el) 과 동일
    // $(this.el).html( this.todoTpl( this.model.toJSON() )
    this.input = this.$('.edit');
    return this;
  },

  edit: function() {
    // todo 라벨이 더블클릭 되면 실행
  },

  close: function() {
    //tododptj 포커스를 잃어버리면 실행
  },

  updateOnEnter: function(e) {
    //todo 편집모드에서 키가 눌러졌을 때 실행되지만 입력을 받기 위해 대기 상태를 유지
  }
});

var todoView = new TodoView();
console.log(todoView.el); // <li></li>
// View 예제

// 모든 뷰는 반드시 하나의 el을 가져야 한다.
// el과 $el 의 차이
// el은 Document 요소를 나타냄
// $el은 Jqeury 요소를 나타냄 ex) $el.val();

// View 속성(멤버)
var TodoView = Backbone.View.extend({
  tagName: 'ul', // 필수사항 default : div
  className: 'conainer', // 선택사항, 여러개 가능 'conainer anotherClass'
  id: 'todos', // 선택사항
});
console.log(new TodoView().el); // <ul id="todos" class="conainer"></ul>
// View 속성(멤버)

// 요소가 이미 있으며 새로운 뷰or뷰 객체 생성시 아래와 같이 재사용 가능
// 1. 새로운 뷰로 재사용
var TodoView = Backbone.View.extend({
  el :'footer'
});
console.log(new TodoView().el);
// 2. 뷰 객체로 재사용
var todoView = new TodoView({
  el: $('footer')
});
console.log(todoView.el);
// 3. setElement($el) 로 재사용
var button1 = $('<button></button>');
var button2 = $('<button></button>');
// $('<button></button>')는 button 요소를 새로 생성
// $('button')는 button 요소를 기존 Document 에서 찾음
var View = Backbone.View.extend({
  events: {
    click: function(e) {
      console.log(this.el === e.target);
    }
  }
});

var view = new View({el: button1});
view.setElement(button2);

button1.trigger('click');
button2.trigger('click');

/* render() 이해 */
// 가장 단순한 render()
var ListView = Backbone.View.extend({
  render: function(){
    this.$el.html(this.model.toJSON());
  }
});
// 가장 단순한 render()

// 개별 항목에 render() 를 적용하기 위한 코드
var ItemView = Backbone.View.extend({ //개별 항목용 뷰를 만든다. render() 만 구현
  events: {},
  render: function(){
    this.$el.html(this.model.toJSON()); // 정의한 model 속성들을 전달
    return this;
  }
});

var ListView = Backbone.View.extend({
  render: function(){
     var item = this.model.get('items'); // model이 있다는 가정하에..

     _.each(items, function(item){ // List Collection을 ItemView render()를 통해서 실행
       var itemView = new ItemView({ model: item });
       this.$el.append( itemView.render().el );
     }, this);
     // _.each(list, iteratee, [context])
  }
});
// 개별 항목에 render() 를 적용하기 위한 코드

/* 이벤트 해시 */
var TodoView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click .toggle': 'toggleComplited',
    'dbclick label': 'edit',
    'click .destroy': 'clear',
    'blur .edit': 'close'
  },

  toggleComplited: function(){
    // class명이 toogle 요소가 클릭 되었을 경우 발생할 이벤트
  }
    :
    :
});
/* 이벤트 해시 */

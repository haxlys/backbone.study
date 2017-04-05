var App = App || {};
// Backbone Model

// Model 생성
var Todo = Backbone.Model.extend({}); // 빈 모델
var Todo = Backbone.Model.extend({ // 기본값 설정한 모델
  defaults: {
    title: '',
    completed: false
  }
});

var todo1 = new Todo(); // 객체 생성할 때 인자 없을 경우 defaluts에 선언한데로 모델 생성
var todo2 = new Todo({ // 객체 생성 시 인자 줄 경우 인자대로 설정, 이 때 defaults에 선언했던 값들이 없어도 상관없이 설정된다. 유효성 체크 설정도 가능하다.
  title: 'Check the atrributes of both model instances in the console.',
  completed: true
});
// Model 생성

// Model Attributes get() set()
todo1.get('title'); // attribute 키를 이용하여 반환
todo2.toJSON(); // 모든 attributes를 반환 할 때는 toJSON() 사용.

todo1.set('title','zz'); // 속성 하나 변경
todo1.set({ // 모든 속성 변경, 객체 형식으로 부분만 변경도 가능.
  title: 'use set method'
  ,completed: true // 이 줄을 주석처리하면 title 속성만 변경됨
});
// Model Attributes get() set()

// 모델 변경 리스너 : 모델이 변경되었을 때 리스너를 이용하여 이벤트 발생
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  initialize: function(){ // 이곳에 이벤트 리스너를 정의한다.
    // 최초 한번 실행됨
    console.log('this model has been initialized.');

    this.on('change', function(){ // 리스너 장착으로 attributes 변경될 때 실행.(change)
      console.log('- Everything for this model have changed.');
    });

    this.on('change:title', function(){ // 단일 attribute에 대한 리스너(:title)
      console.log('- Title Value for this model have changed.');
    });
  }
});

var myTodo = new Todo();
myTodo.set('title', 'The listener is triggered wenever an attribute value change.');
// 모델 변경 리스너

// 검증
var Todo = Backbone.Model.extend({
  defaults: {
    //title:'11', // title 속성 제거함
    completed: false
  },

  validate: function(attribs){ // attribs 인자에는 속성들이 넘어옴
    if(attribs.title === undefined){
      return "Remember to set a title for your todo.";
    } else if(attribs.completed === undefined) {
      return "completed 속성은 필수적으로 정의(boolean) 되어야 합니다."
    }
  },

  initialize: function(){
    console.log('this model has been initialized.');
    this.on('invalid', function(model, error){ // 에러 발생 이벤트 리스너(invalid), validate 정의된 return 값이 error로 넘어온다.
      // console.log(model); // 에러 발생한 model
      console.log(error);
    });
  }
});

var myTodo = new Todo();
myTodo.set('completed', true, {validate: true}); // 3번째 인자로 속성 검증을 한다.
myTodo.get('completed'); // false

myTodo.unset('title', {validate: true}); // unset()는 속성을 제거한다. 당연히 속성 제거 후 검증하면 invalid 발생
// validate -> invalid 리스너 // validate가 정의되어 있지 않으면 리스너도 작동 하지 않음
// 검증

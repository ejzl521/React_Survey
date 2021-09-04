// applyMiddleware는 스토어에 미들웨어를 적용하기 위해 불러옴
import { createStore, combineReducers, applyMiddleware } from "redux";
//우리가 만든 리덕스 모듈의 리듀서
import quiz from './modules/quiz';
import { createBrowserHistory } from "history";
// thunk 가져오기
import thunk from "redux-thunk"

// 미들웨어 만들기
const middlewares = [thunk];
// 스토어에 미들웨어를 적용하기 위한 변수 만들기
const enhancer = applyMiddleware(...middlewares);

// 브라우저 히스토리를 만들어줍니다.
export const history = createBrowserHistory();
// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가해주는 거예요!
const rootReducer = combineReducers({ quiz });

// 스토어를 만든다. 리듀서와 미들웨어를 넣어줌!
const store = createStore(rootReducer, enhancer);

export default store;
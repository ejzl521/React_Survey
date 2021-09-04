import { firestore } from "../../firebase";

// Initial state
const initialState = {
    title: "설문조사 제목을 입력하세요",
    list: [
        {
            type: "objective",
            title: "객관식 제목을 입력하세요",
            quizList: ["보기를 만들어 주세요 ^^"]

        },
        {
            type: "subjective",
            title: "주관식 제목을 입력하세요",
        },

    ]
}

// Action
const CREATE = 'quiz/CREATE';
const CHANGE_MAIN_TITLE = 'quiz/CHANGE_MAIN_TITLE';
const CHANGE_TITLE = 'quiz/CHANGE_TITLE';
const ADD_QUESTION = 'quiz/ADD_QUESTION';
const CHANGE_TEXT = 'quiz/CHANGE_TEXT';
const CHANGE_TO_OBJ = 'quiz/CHANGE_TO_OBJ';
const CHANGE_TO_SUB = 'quiz/CHANGE_T0_SUB';
const DELETE_QUESTION = 'quiz/DELETE_QUESTION';
const DELETE = 'quiz/DELETE';
const SAVE = 'quiz/SAVE';

// Action Creator

export const createQuiz = () => {
    return { type: CREATE };
}

export const changeMainTitle = (text) => {
    return { type: CHANGE_MAIN_TITLE, text }
}

export const changeTitle = (text, index) => {
    return { type: CHANGE_TITLE, text, index };
}

// index = 문제 번호, _index = 보기 번호
export const changeText = (text, index, _index) => {
    return { type: CHANGE_TEXT, text, index, _index };
}

// index = 문제 번호
export const addQuestion = (index) => {
    return { type: ADD_QUESTION, index };
}

export const changeToObj = (index) => {
    return { type: CHANGE_TO_OBJ, index };
}

export const changeToSub = (index) => {
    return { type: CHANGE_TO_SUB, index };
}

export const deleteQuestion = (index, _index) => {
    return { type: DELETE_QUESTION, index, _index };
}

export const deleteQuiz = (index) => {
    return { type: DELETE, index };
}

export const saveQuiz = (quiz) => {
    return { type: SAVE, quiz }
}


// Firebase에 quiz 업데이트
export const saveQuizFB = () => {
    return function (dispatch, getState) {
        const quizList = getState().quiz.list;
        const quizDB = firestore.collection(getState().quiz.title);
        quizList.forEach((item, index) => {
            if (item.type === "objective") {
                quizDB.doc(`${index + 1}번`).set({ type: item.type, title: item.title, quizList: item.quizList })
            }
            else {
                quizDB.doc(`${index + 1}번`).set(({ type: item.type, title: item.title }))
            }
        })
    }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'quiz/CREATE':
            const new_quiz_list = [
                ...state.list,
                {
                    type: "objective",
                    title: "객관식 제목을 입력하세요",
                    quizList: ["보기를 만들어 주세요 ^^"]
                }
            ]
            return { title: state.title, list: new_quiz_list }

        case 'quiz/CHANGE_MAIN_TITLE':
            return { ...state, title: action.text }

        case 'quiz/CHANGE_TITLE':
            const changed_title = { ...state };
            changed_title.list[action.index].title = action.text;
            return changed_title;

        case 'quiz/CHANGE_TEXT':
            const changed_text = { ...state };
            changed_text.list[action.index].quizList[action._index] = action.text;
            return changed_text;

        case 'quiz/ADD_QUESTION':
            const added_question = { ...state };
            added_question.list[action.index].quizList.push("보기를 만들어 주세요 ^^");
            return added_question;

        case 'quiz/CHANGE_TO_OBJ':
            const changed_obj = state.list.map((item, index) => {
                if (index === action.index) {
                    return (
                        {
                            type: "objective",
                            title: "객관식 제목을 입력하세요",
                            quizList: ["보기를 만들어 주세요 ^^"]
                        }
                    )
                }
                return item;
            })
            return { title: state.title, list: changed_obj };

        case 'quiz/CHANGE_T0_SUB':
            const changed_sub = state.list.map((item, index) => {
                if (index === action.index) {
                    return (
                        {
                            type: "subjective",
                            title: "주관식 제목을 입력하세요",
                        }
                    )
                }
                return item;
            })
            return { title: state.title, list: changed_sub };

        case 'quiz/DELETE_QUESTION':
            const deleted_question = { ...state };
            deleted_question.list[action.index].quizList.splice(action._index, 1);
            console.log(deleted_question, action.index, action._index)
            return deleted_question;

        case 'quiz/DELETE':
            const deleted_quiz_list =
                state.list.filter((item, index) => index !== action.index)
            return { title: state.title, list: deleted_quiz_list };

        default:
            return state;
    }
}

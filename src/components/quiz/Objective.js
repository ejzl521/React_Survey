import styled from "styled-components";
import { useState } from "react";
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { changeToObj, changeToSub, deleteQuiz, addQuestion, changeTitle, changeText, deleteQuestion } from "../../redux/modules/quiz";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Objective = (props) => {

    const dispatch = useDispatch()
    const quizList = useSelector(state => state.quiz.list[props.index]);
    const [titleUnderline, setTitleUnderline] = useState("#ddd");
    const [underline, setUnderline] = useState(quizList.quizList.map(item => "yellow"));

    const change_text = (e, index) => {
        dispatch(changeText(e.target.value, props.index, index))
    };

    const change_title = (e, index) => {
        dispatch(changeTitle(e.target.value, props.index))
    };

    const change_underline = (index) => {
        const changed_underline = underline.map((item, _index) => {
            if(index === _index){
                return "blue"
            }
            return item;
        })
        setUnderline(changed_underline);
    };

    const reset_underline = () => {
        setUnderline(quizList.quizList.map(item => "yellow"))
    }

    return (
        <ObjectiveContainer>
            <ObjectiveHeader>
                <ObjectiveTitle underline={titleUnderline}
                    onFocus={() => {
                        setTitleUnderline("blue")
                    }}
                    onBlur={() => {
                        setTitleUnderline("#ddd")
                    }}
                >
                    <textarea
                        className="title-input"
                        value={quizList.title}
                        onChange={(e) => { change_title(e, props.index) }}
                    />
                </ObjectiveTitle>
                <SelectQuiz>
                    <div className="dropdown">
                        <button className="dropbtn">문제 유형</button>
                        <div className="dropdown-content">
                            <span onClick={() => { dispatch(changeToObj(props.index)) }}>객관식</span>
                            <span onClick={() => { dispatch(changeToSub(props.index)) }}>주관식</span>
                        </div>
                    </div>
                </SelectQuiz>
            </ObjectiveHeader>

            <ObjQuizContainer>
                {quizList.quizList.map((item, index) => {
                    return (
                        <ObjQuiz key={index}>
                            <SentimentVerySatisfiedIcon />
                            <QuizInputWrapper underline = {underline[index]}
                                onFocus={() => {
                                    change_underline(index)
                                }}
                                onBlur={() => {
                                    reset_underline();
                                }}
                            >
                                <textarea
                                    className="quiz-input"
                                    value={item}
                                    onChange={(e) => { change_text(e, index); }}
                                />
                            </QuizInputWrapper>
                            <ClearIcon color="secondary"
                                style={{ cursor: "pointer" }}
                                onClick={()=>{dispatch(deleteQuestion(props.index, index))}}
                            />
                        </ObjQuiz>
                    );
                })}

            </ObjQuizContainer>
            <QuizFooter>
                <AddQuizButton onClick={() => {
                    dispatch(addQuestion(props.index));
                    setUnderline(quizList.quizList.map(item=>"yellow"));
                }}>
                    <AddIcon color="primary"></AddIcon>
                    <span> 보기추가</span>
                </AddQuizButton>
                <DeleteQuizButton onClick={() => {
                    dispatch(deleteQuiz(props.index))
                    setUnderline(quizList.quizList.map(item=>"yellow"));
                }}>
                    <DeleteForeverIcon color="secondary"></DeleteForeverIcon>
                    <span> 삭제하기</span>
                </DeleteQuizButton>
            </QuizFooter>
        </ObjectiveContainer>
    );
};

export default Objective;

const ObjectiveContainer = styled.div`
    padding: 20px;
    margin-top: 40px;
    border: 2px solid skyblue;
    border-radius: 10px;

    &: hover {
        border: 2px solid blue;
    }
    transition: border 500ms;
`;

const ObjectiveHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ObjectiveTitle = styled.div`
    width: 70%;
    border-bottom: 2px solid ${props => props.underline};
    margin-bottom: 20px;
    transition: border-bottom 500ms;
    .title-input{
        width: 100%;
        resize: none;
        font-weight: 600;
        font-size: 1.5em;
        height: 1.1em;
        border: 0;
        overflow: hidden;
        
        &:focus{
            outline: none;
        }
    }
`;

const SelectQuiz = styled.div`
    
    .dropdown {
        position: relative;
        display: inline-block;
        &:hover .dropdown-content {
            display: block;
        }
        &:hover .dropbtn {
            background-color: #3e8e41;
        }
    }

    .dropbtn {
        background-color: blue;
        color: white;
        padding: 16px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
      
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        span{
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            cursor: pointer;
        }
        span:hover{
            background-color: #ddd;
        }
    }  
`

const ObjQuizContainer = styled.div`
    margin-top 20px;
`;

const ObjQuiz = styled.div`

    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .quiz-input{
        width: 100%;
        resize: none;
        height: 1em;
        border: 0;
        overflow: hidden;
        &:focus{
            outline: none;
        }
    }
`

const QuizInputWrapper = styled.div`
    width: 80%;
    margin: 0 10px;
    border-bottom: 2px solid ${props => props.underline};
`
const QuizFooter = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AddQuizButton = styled.div`
    display: flex;
    width: 13%;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: blue;
    &:hover{
        cursor: pointer;
    }
`

const DeleteQuizButton = styled.div`
    display: flex;
    width: 13%;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: red;
    &:hover{
        cursor: pointer;
    }
`

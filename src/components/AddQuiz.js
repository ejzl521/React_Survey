import React from "react";
import styled from "styled-components";
import Objective from "./quiz/Objective";
import QuizTitle from "./quiz/QuizTitle";
import Subjective from "./quiz/Subjective";
import { createQuiz, saveQuizFB } from "../redux/modules/quiz";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from '@material-ui/icons/Add';

const AddQuiz = () => {

    const dispatch = useDispatch();
    const quizList = useSelector(state => state.quiz);

    return (
        <Container >
            <QuizTitle/>
            {quizList.list.map((item, index) => {
                if (item.type === "objective") {
                    return (
                        <Objective key={index} index={index}/>
                    );
                }
                else {
                    return (
                        <Subjective key={index} index={index}/>
                    );
                }
            })}
            <QuizFooter>
                <AddQuizButton onClick={() => { dispatch(createQuiz()) }}>
                    <AddIcon color="primary"></AddIcon>
                    <span> 문제 추가</span>
                </AddQuizButton>
                <CompleteButton onClick={()=>{
                   dispatch(saveQuizFB());
                }}>
                    <button>제출하기</button>
                </CompleteButton>
            </QuizFooter>
        </Container>
    );

}

export default AddQuiz;

const Container = styled.div`

    max-width: 700px;
    min-height: 60vh;
    background-color: #fff;
    padding: 32px;
    margin: 20px auto;
    border-radius: 10px;

`;
const AddQuizButton = styled.div`
    display: flex;
    width: 16%;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    color: blue;
    &:hover{
        cursor: pointer;
    }
`
const QuizFooter = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CompleteButton = styled.div`
    button{
        font-size: 1em;
        border: 0;
        border-radius: 10px;
        padding: 8px 12px;
        color: #fff;
        background-color: #4d4d4d;
        cursor: pointer;
        &:hover{
            background-color: orange;
        }
    }
`
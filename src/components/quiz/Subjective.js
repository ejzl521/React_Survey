import React, { useState, useRef } from "react";
import styled from "styled-components";
import { changeToObj, changeToSub, deleteQuiz, changeTitle } from "../../redux/modules/quiz";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const Subjective = (props) => {

    const [titleUnderline, setTitleUnderline] = useState("#ddd");
    const titleRef = useRef()
    const title = useSelector(state => state.quiz.list[props.index].title)
    const dispatch = useDispatch();

    const change_title = (e, index) => {
        dispatch(changeTitle(e.target.value, props.index))
    }

    
    return (
        <SubjectiveContainer>
            <SubjectiveHeader>
                <SubjectiveTitle underline={titleUnderline}
                    onFocus={() => {
                        setTitleUnderline("blue")
                    }}
                    onBlur={() => {
                        setTitleUnderline("#ddd")
                    }}
                >
                    <textarea
                        ref={titleRef}
                        className="title-input"
                        value = {title}
                        onChange={(e)=>{change_title(e, props.index)}}
                    />
                </SubjectiveTitle>
                <SelectQuiz>
                    <div className="dropdown">
                        <button className="dropbtn">문제 유형</button>
                        <div className="dropdown-content">
                            <span onClick={() => { dispatch(changeToObj(props.index)) }}>객관식</span>
                            <span onClick={() => { dispatch(changeToSub(props.index)) }}>주관식</span>
                        </div>
                    </div>
                </SelectQuiz>
            </SubjectiveHeader>
            <QuizFooter>
                <DeleteQuizButton onClick={() => { dispatch(deleteQuiz(props.index)) }}>
                    <DeleteForeverIcon color="secondary"></DeleteForeverIcon>
                    <span> 삭제하기</span>
                </DeleteQuizButton>
            </QuizFooter>
        </SubjectiveContainer>

    );
}

export default Subjective;

const SubjectiveContainer = styled.div`
    padding: 20px;
    margin-top: 40px;
    border: 2px solid skyblue;
    border-radius: 10px;
    
    &: hover{
        border: 2px solid blue;
    }
    transition: border 500ms;
`;

const SubjectiveHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SubjectiveTitle = styled.div`
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


const QuizFooter = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
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
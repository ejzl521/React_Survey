import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMainTitle } from "../../redux/modules/quiz";

const QuizTitle = (props) => {

    const dispatch = useDispatch();
    const [underline, setUnderline] = useState("#ddd");

    const title = useSelector(state=>state.quiz);

    const change_main_title = (e) => {
        dispatch(changeMainTitle(e.target.value))
    }

    return (
        <TitleContainer
            underline={underline}
            onFocus={() => {
                setUnderline("blue")
            }}
            onBlur={() => {
                setUnderline("#ddd")
            }}
        >
            <textarea 
                className="title-input"
                value = {title.title}
                onChange={(e)=>{change_main_title(e)}}
            />
        </TitleContainer>
    );
};

export default QuizTitle;

const TitleContainer = styled.div`
    border-bottom: 2px solid ${props => props.underline};
    transition: border-bottom 500ms;

    textarea {
        width: 100%;
        resize: none;
        font-size: 3em;
        font-weight: 700;
        height: 1.2em;
        border: 0;
        overflow: hidden;
        
        &:focus{
            outline: none;
        }
    }
`;


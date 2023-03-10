import styled from "styled-components";

export const StyledFormRegister = styled.form`
display: flex;
flex-direction: column;
align-items: center;
gap: 16px;
margin-top: 48px;

.button-sign-up{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

& button {
    width: 226px;
    height: 34px;
    border-radius: 8px;
    border:none;
    font-family:var(--font-text-default);
    font-size:var(--title-size-3);
    font-weight:500;
    color:var(--color-grey-800);
    background-color:var(--color-primary);

    &:hover {
        background-color:var(--color-primary-hover);
    }

}
@media (min-width: 769px){
    form {
        width:400px;
        align-items:center;
        gap:25px;
        
    }

    & button {
            width:333px;
            height: 42px;
            font-size:var(--text-size-default);
        }
}
`
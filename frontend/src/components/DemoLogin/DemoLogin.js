import { LoginBtn } from '../styled-components/index';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { useLoginSignup } from '../../context/LoginSignup';


export default function DemoLogin() {
    const {setCurrentModal} = useLoginSignup();
    const dispatch = useDispatch();

    const handleDemoLogin = async e => {
        const data = await dispatch(login('demo@user.io', 'password'))
        setCurrentModal('');
    }

    return (
        <LoginBtn type="button" onClick={handleDemoLogin}>Login as a Demo User</LoginBtn>
    )
}

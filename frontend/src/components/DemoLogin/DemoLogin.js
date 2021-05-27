import { LoginBtn } from '../styled-components/index';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../store/session';


export default function DemoLogin() {
    const dispatch = useDispatch();

    const handleDemoLogin = async e => {
        const data = await dispatch(login('demo@user.io', 'password'))
    }

    return (
        <LoginBtn type="button" onClick={handleDemoLogin}>Login as a Demo User</LoginBtn>
    )
}

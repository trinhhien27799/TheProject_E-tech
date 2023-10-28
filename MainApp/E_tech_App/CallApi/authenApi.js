
export const registerUser = async (username, email, password,navigation) => {
    try {
        const response = await fetch('http://10.0.2.2:3000/api/user/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname:username,username:email, password:password })
        });
        const data = await response.json();
        if (data.code == 200) {
            navigation.navigate('ButtonNavigation');
            alert('Đăng nhập thành công')
        } else
        alert (data.message);
        return data;

        
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const insertOtp = async (email) => {
    try {
        const response = await fetch('http://10.0.2.2:3000/api/user/receive-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username:email,forgotPassword:false })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.code === 200) {
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        } else {
            console.error(email);
        }
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const loginUser = async (username, password,navigation) => {
    try {
        const response = await fetch('http://10.0.2.2:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log(data);
        if (data.code === 200) {
            navigation.navigate('ButtonNavigation');
            alert('Đăng nhập thành công')
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Lỗi yêu cầu mạng:', error);
        throw error;
    }
}
export const verifyOTP = async (username,otp)=>{
    try{
        const response = await fetch('http://10.0.2.2:3000/api/user/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, otp })
        });
        const data = await response.json();
        return data;
    }catch (error) {
        console.log(error);
    }
}
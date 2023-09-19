export function userLoggedin() {
    const isLoggedIn = localStorage.getItem('user')
    if (isLoggedIn) {
        console.log("Login Token: " + isLoggedIn);
    }
    if (!isLoggedIn) {
        alert("Please Login");
        window.location.href = '/login'
    }
}

// 




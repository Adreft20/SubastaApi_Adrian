const $submit = document.getElementById('submit');
const $password = document.getElementById('password');
const $username = document.getElementById('username');
const $visible = document.getElementById('visible');

//Mostrar/ocultar contraseña      
document.addEventListener("change", (e) => {
    if(e.target.id === 'visible') {
        if($visible.checked) {
            $password.type = 'text';
        } else {
            $password.type = 'password';
        }
    }
});

//Login
document.addEventListener("click", (e) => {
    if(e.target.id === 'submit') {
        e.preventDefault();
        if($username.value === '' || $password.value === '') {
            alert("Por favor, complete todos los campos");
            return;
        }
        try {
            const response = fetch("http://localhost:5288/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: $username.value,
                    contrasena: $password.value
                })
            });
            if(response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                window.location.href = "http://localhost:5288/home.html";
            } else {
                alert("Correo o contraseña incorrectos");
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    }
});        

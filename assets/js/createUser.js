
// Função global que pode ser chamada do console
// No console do navegador
//ex: createUser("Maria Santos", "maria.santos@email.com", "minhasenha123")
window.createUser = async function(name, email, password) {
    try {
        const response = await fetch('https://www.abibliadigital.com.br/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                notifications: true
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Token gerado:', data.token);

        // Salvar o token no localStorage
        localStorage.setItem('bibleApiToken', data.token);

        return data.token;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return null;
    }
}
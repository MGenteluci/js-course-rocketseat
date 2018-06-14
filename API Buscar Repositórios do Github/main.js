var divElement = document.querySelector('#app');
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

btnElement.onclick = function buscarUsuario(){
    listElement.innerHTML = '';
    var inputText = inputElement.value;

    var loadElement = document.createElement('li');
    var loadText = document.createTextNode('Carregando...');
    loadElement.appendChild(loadText);
    divElement.appendChild(loadElement);

    axios.get('https://api.github.com/users/' + inputText)
        .then(function (response) {
            console.log(response);

            var resposta = response;
            repos = resposta.data.repos_url;

            //Fazendo requisição na url dos repositórios
            axios.get(repos)
                .then(function (response) {
                    console.log(response);
                    for(repo of response.data){
                        var nome = repo.name;
                        
                        var repoName = document.createElement('li');
                        var repoText = document.createTextNode(nome);
                        repoName.appendChild(repoText);
                        listElement.appendChild(repoName);
                    }
                    divElement.removeChild(loadElement);
                })
                .catch(function (error) {
                    console.warn(error);
                });

        })
        .catch(function (error) {
            console.warn(error);
        });

        inputElement.value = '';
}
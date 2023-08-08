fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .then(response => response.json())
    .then(json => {
        json.results.forEach(result => {
            const listagemPokemon = document.getElementsByClassName('listagem-pokemon')[0];



            // CARTAO
            const cartao = document.createElement("li");
            cartao.classList.add('cartao-pokemon');

            fetch(result.url)
                .then(response => response.json())
                .then(pokemon => {
                    const urlImagem = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;

                    const tiposPokemon = pokemon.types;

                    // INFORMACOES
                    const informacoes = document.createElement("div");
                    informacoes.classList.add('informacoes');

                    informacoes.innerHTML += '<span>' + pokemon.name + '</span><span> #' + ("00" + pokemon.id).slice(-3) + '</span>';

                    cartao.appendChild(informacoes);

                    // IMAGEM
                    const img = document.createElement("img");
                    img.src = urlImagem;
                    img.classList.add("gif")
                    cartao.appendChild(img);

                    // TIPOS
                    const tipos = document.createElement("ul");
                    tipos.classList.add("tipos");

                    tiposPokemon.forEach(tipo => {
                        const nomeTipo = tipo.type.name;
                        const li = document.createElement("li");
                        li.classList.add("tipo");
                        li.classList.add(nomeTipo);
                        li.innerHTML = nomeTipo.charAt(0).toUpperCase() + nomeTipo.slice(1);
                        tipos.appendChild(li);
                    });

                    cartao.appendChild(tipos);

                    // DESCRICAO


                    fetch(pokemon.species.url)
                        .then(response => response.json())
                        .then(especie => {
                            const descricao = document.createElement("p");
                            descricao.classList.add("descricao");
                            const arrayDescricoes = especie.flavor_text_entries;
                            const descricaoEncontrada = arrayDescricoes.find(descricao => descricao.version.name === 'emerald' && descricao.language.name === 'en');
                            descricao.innerHTML = descricaoEncontrada.flavor_text;
                            cartao.appendChild(descricao);

                            /*{
                                flavor_text:"BULBASAUR can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.",
                                language: {
                                    name:"en",
                                    url:"https://pokeapi.co/api/v2/language/9/"  
                                },
                                version: {
                                    name:"emerald",
                                    url:"https://pokeapi.co/api/v2/version/9/"
                                }
                            }*/




                        });


                    




                });

            listagemPokemon.appendChild(cartao);
        });
        const botaoAlterarTema = document.getElementById("botao-alterar-tema");
        const body = document.querySelector("body");
        const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao");

        botaoAlterarTema.addEventListener("click", () => {
            const modoEscuroEstaAtivo = body.classList.contains("modo-escuro");

            body.classList.toggle("modo-escuro");

            if (modoEscuroEstaAtivo) {
                imagemBotaoTrocaDeTema.setAttribute("src", "./imagens/sun.png");
            } else {
                imagemBotaoTrocaDeTema.setAttribute("src", "./imagens/moon.png");
            }
        });


    });

